import { Dexie, IndexableType } from 'dexie'
import db from 'js/database'
import { gql } from 'js/graphql'
import { Model } from 'js/model/model'
import map from 'lodash/map'
import Book from './book'

interface Where {
    field: string
    operator: string
    value: string | number | boolean
    type: { type: string, jsType: any }
}

export interface GetOptions {
    cache?: boolean
    network?: boolean
    save?: boolean
}

const opConv: { [key: string]: string } = {
    '=': '',
    '!=': '_ne',
    '>': '_gt',
    '<': '_lt',
    '~=': '_co',
}

export class QueryBuilder<T extends Model> {
    private TClass: any
    private wheres: Where[] = []
    private selects: string[] = []

    private _skip: number = 0
    private _take: number = 100

    constructor(TClass: any) {
        this.TClass = TClass
    }

    public query(): string {
        return ''
    }

    public where(field: string, value: string | number | boolean): QueryBuilder<T>
    public where(field: string, operator: string, value?: string | number | boolean): QueryBuilder<T>
    public where(field: string, operator: string, value?: string | number | boolean): QueryBuilder<T> {
        let where: Where
        if (value === undefined) {
            where = {
                field: field,
                operator: '=',
                value: operator,
                type: this.TClass.types[field],
            }
        } else {
            where = {
                field: field,
                operator: operator,
                value: value,
                type: this.TClass.types[field],
            }
        }
        if (field === 'search') {
            where.operator = '='
            where.type = { type: 'String', jsType: undefined }
        }
        this.wheres.push(where)
        return this
    }

    public select(...selects: string[]): QueryBuilder<T> {
        this.selects = this.selects.concat(selects)
        return this
    }

    public skip(skip: number): QueryBuilder<T> {
        this._skip = skip
        return this
    }
    public take(take: number): QueryBuilder<T> {
        this._take = take
        return this
    }

    public async count(): Promise<number> {
        return 0
    }

    public async *get(options: GetOptions = {}): AsyncIterableIterator<T> {
        const defaults: GetOptions = {
            cache: true,
            network: true,
            save: false,
        }
        options = { ...defaults, ...options }
        const types: { [key: string]: string } = {}
        const variables: { [key: string]: string | number | boolean } = {}

        for (const where of this.wheres) {
            const field = where.field + opConv[where.operator]
            types[field] = where.type.type
            variables[field] = where.value
        }

        if (this.selects.length === 0) {
            this.selects = this.generateGQL(this.TClass)
        }
        //  else {
        //     const newSelects: any = {}
        //     for (const select of this.selects) {
        //         const parts = select.split('.')
        //         let currentSelect: any = newSelects

        //         for (const part of parts) {
        //             currentSelect[part] = currentSelect[part] || {}
        //             currentSelect = currentSelect[part]
        //         }
        //     }
        //     console.log(newSelects)

        // }

        // tslint:disable-next-line:max-line-length
        const query = `${this.TClass.table}(take: $take skip: $skip ${map(types, (type, key) => `${key}: $${key}`).join(', ')}) {
            results {
                ${this.selects.join(', ')}
            }
        }`

        variables.take = this._take
        types.take = 'Int!'

        variables.skip = this._skip
        types.skip = 'Int'
        let gqlFetch: any
        if (options.network) {
            gqlFetch = gql(query, types, variables) // start fetching before checking the local cache
        }
        // console.log('get', query, types, variables)
        const table: Dexie.Table<T, string> = (db as any)[this.TClass.table]
        if (options.cache) {
            console.log(this._skip, this._take);
            
            let index = 0
            const cacheData = await table.limit(this._take).filter((item: any) => {
                if (index < this._skip) {

                    return false
                }
                // if (index > this._skip + this._take) {
                //     console.log(index);
                //     return false
                // }
                index++
                for (const where of this.wheres) {
                    switch (where.operator) {
                        case '=':
                            if (item[where.field] !== where.value) {
                                return false
                            }
                            break
                        case '!=':
                            if (item[where.field] === where.value) {
                                return false
                            }
                            break
                        case '>':
                            if (item[where.field] < where.value) {
                                return false
                            }
                            break
                        case '<':
                            if (item[where.field] > where.value) {
                                return false
                            }
                            break
                        case '~=':
                            if (!new RegExp(where.value as string, 'i').test(item[where.field] as string)) {
                                return false
                            }
                            break
                    }
                }
                return true
            }).toArray()

            for (const item of cacheData) {
                yield new this.TClass(item, false)
            }
        }
        if (options.network) {
            const data = await gqlFetch

            for (const result of data.results) {
                if (options.save) {
                    table.put(result)
                }
                yield new this.TClass(result, true)
            }
        }
    }

    private generateGQL(jsType: any): string[] {
        return map(jsType.types, (type, key) => {

            if (type.jsType === undefined) {
                return key
            }
            if (type.jsType === Book) {
                return `${key} (take: 1) {${this.generateGQL(type.jsType).join(', ')}}`
            }
            return `${key} {${this.generateGQL(type.jsType).join(', ')}}`
        })

    }
}
