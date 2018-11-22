import { gql } from 'js/graphql'
import { Model, ModelArray } from 'js/model/model'
import map from 'lodash/map'

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
    private withs: Array<QueryBuilder<any>> = []

    private _skip: number = 0
    private _take: number = 100
    private _sort: string[] = []

    constructor(TClass: any) {
        this.TClass = TClass
    }

    public clone(): QueryBuilder<T> {
        const qb = new QueryBuilder<T>(this.TClass)

        qb.TClass = this.TClass

        qb.wheres = this.wheres.slice(0)
        qb.selects = this.selects.slice(0)
        qb.withs = this.withs.slice(0)

        qb._skip = this._skip
        qb._take = this._take
        qb._sort = this._sort

        return qb
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
                type: this.TClass.types[field] || this.TClass.searchTypes[field],
            }
        } else {
            where = {
                field: field,
                operator: operator,
                value: value,
                type: this.TClass.types[field] || this.TClass.searchTypes[field],
            }
        }
        if (field === 'search') {
            where.operator = '='
            where.type = { type: 'String', jsType: undefined }
        }
        this.wheres.push(where)
        return this.clone()
    }

    public select(...selects: string[]): QueryBuilder<T> {
        this.selects = this.selects.concat(selects)
        return this.clone()
    }

    public skip(skip: number): QueryBuilder<T> {
        this._skip = skip
        return this.clone()
    }
    public take(take: number): QueryBuilder<T> {
        this._take = take
        return this.clone()
    }

    public sort(...column: string[]): QueryBuilder<T> {
        this._sort = this._sort.concat(column)
        return this.clone()
    }

    public with(...qb: Array<QueryBuilder<any>>): QueryBuilder<T> {
        this.withs = this.withs.concat(qb)
        return this.clone()
    }

    // public async count(): Promise<number> {
    //     return 0
    // }

    public getQuery(prefix?: string): [string, Dictionary<string>, Dictionary<string | number | boolean>] {
        const types: Dictionary<string> = {}
        const variables: Dictionary<string | number | boolean> = {}
        let withTypes: Dictionary<string> = {}
        let withVariables: Dictionary<string | number | boolean> = {}
        let selects: string[] = []

        for (const where of this.wheres) {
            const field = where.field + opConv[where.operator]
            types[field] = where.type.type
            variables[field] = where.value
        }

        if (this._sort.length > 0) {
            types.sort = 'String'
            variables.sort = this._sort.join(',')
        }

        if (this.selects.length === 0) {
            selects = this.generateGQL(this.TClass)
        } else {
            for (const select of this.selects) {
                const type = this.TClass.types[select]
                if (type.jsType !== undefined) {
                    selects.push(`${select} {${this.generateGQL(type.jsType).join(', ')}}`)
                } else {
                    selects.push(select)
                }
            }
        }

        const withSelects: string[] = []
        for (const qb of this.withs) {
            const [q, t, v] = qb.getQuery('test')
            withSelects.push(q)
            withTypes = { ...withTypes, ...t }
            withVariables = { ...withVariables, ...v }
        }

        variables.take = this._take
        types.take = 'Int!'

        variables.skip = this._skip
        types.skip = 'Int'

        if (prefix) {
            for (const name in types) {
                if (types.hasOwnProperty(name)) {
                    types[`${prefix}_${name}`] = types[name]
                    delete types[name]
                }
            }
            for (const name in variables) {
                if (variables.hasOwnProperty(name)) {
                    variables[`${prefix}_${name}`] = variables[name]
                    delete variables[name]
                }
            }
        }

        // tslint:disable-next-line:max-line-length
        const query = `${this.TClass.table}(${map(types, (_, key) => `${key.replace(prefix + '_', '')}: $${key}`).join(', ')}) {
            page_info {
                total
                skip
                take
            }
            results {
                ${selects.concat(withSelects).join('\n                ')}
            }
        }`

        return [
            query,
            { ...types, ...withTypes },
            { ...variables, ...withVariables },
        ]
    }

    public async get(options: GetOptions = {}): Promise<ModelArray<T>> {
        const defaults: GetOptions = {
            cache: false,
            network: true,
            save: false,
        }
        options = { ...defaults, ...options }

        const [query, types, variables] = this.getQuery()

        const gqlFetch = gql(query, types, variables) // start fetching before checking the local cache

        // console.log('get', query, types, variables)
        const data = await gqlFetch

        return this.buildResult(this.TClass, data)

    }

    public async first(options: GetOptions = {}): Promise<T> {
        this.take(1)
        const models = await this.get(options)
        return models[0] || null
    }

    public generateGQL(jsType: any): string[] {
        return map(jsType.types, (type, key) => {
            if (type.writeOnly) {
                return
            }
            if (type.jsType === undefined) {
                return key
            }
            if (type.jsType.prototype instanceof Model) {
                return
                // return `${key} (take: 1) {${this.generateGQL(type.jsType).join(', ')}}`
            }
            return `${key} {${this.generateGQL(type.jsType).join(', ')}}`
        })

    }

    private buildResult(jsType: any, data: any): ModelArray<T> {
        const elements: T[] = []

        for (const element of [].concat(data.results)) {
            map(jsType.types, (type, key) => {
                if (element[key] && type.jsType && type.jsType.prototype instanceof Model) {
                    element[key] = this.buildResult(type.jsType, element[key])
                }
            })
            elements.push(new jsType(element, true))
        }

        return new ModelArray(elements, data.page_info)
    }
}

/*

        const table: Dexie.Table<T, string> = (db as any)[this.TClass.table]
        if (options.cache) {

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
        */
