import { Dexie, IndexableType } from 'dexie'
import db from 'js/database'
import { gql } from 'js/graphql'
import { Model } from 'js/model/model'
import map from 'lodash/map'

interface Where {
    field: string
    operator: string
    value: IndexableType
    type: { type: string, jsType: any }
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

    public where(...args: string[]): QueryBuilder<T> {
        let where: Where
        switch (args.length) {
            case 2:
                where = {
                    field: args[0],
                    operator: '=',
                    value: args[1],
                    type: this.TClass.types[args[0]],
                }
                break
            case 3:
                where = {
                    field: args[0],
                    operator: args[1],
                    value: args[2],
                    type: this.TClass.types[args[0]],
                }
                break
            default:
                throw new Error('unsupported number of arguments in where')
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

    public async *get(): AsyncIterableIterator<T> {

        const types: { [key: string]: string } = {}
        const variables: { [key: string]: IndexableType } = {}

        for (const where of this.wheres) {
            const field = where.field + opConv[where.operator]
            types[field] = where.type.type
            variables[field] = where.value
        }

        if (this.selects.length === 0) {
            this.selects = map(this.TClass.types, (type, key) => {
                if (type.jsType === undefined) {
                    return key
                }
                return key + `{${map(type.jsType.types, (t, k) => k).join(', ')}}`
            })
        }

        const query = `${this.TClass.table}(take: $take skip: $skip
            ${map(types, (type, key) => `${key}: $${key}`).join(', ')}) {
            results {
                ${this.selects.join(', ')}
            }
        }`

        variables.take = this._take
        types.take = 'Int!'

        variables.skip = this._skip
        types.skip = 'Int'

        const gqlQuery = gql(query, types, variables)
        // console.log('get', query, types, variables)
        const table: Dexie.Table<T, string> = (db as any)[this.TClass.table]
        const cacheData = await table.filter((item: any) => {
            for (const where of this.wheres) {
                if (item[where.field] !== where.value) {
                    return false
                }
            }
            return true
        }).toArray()

        for (const item of cacheData) {
            yield new this.TClass(item, false)
        }

        const data = await gqlQuery

        for (const result of data.results) {
            db.books.put(result)
            yield new this.TClass(result, true)
        }
    }
}
