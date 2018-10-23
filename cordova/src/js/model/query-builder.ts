import { gql } from 'js/graphql'
import { Model } from 'js/model/model'
import { map } from 'lodash'

interface Where {
    field: string
    operator: string
    value: string | number | boolean
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

    public async get(): Promise<T[]> {

        const types: { [key: string]: string } = {}
        const variables: { [key: string]: string | number | boolean } = {}

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
            page_info {
                total
            }
            results {
                ${this.selects.join(', ')}
            }
        }`

        variables.take = this._take
        types.take = 'Int!'

        variables.skip = this._skip
        types.skip = 'Int'

        // console.log('get', query, types, variables)

        const data = await gql(query, types, variables)
        // console.log(data)

        const list = data.results.map((result: any) => new this.TClass(result))
        list.total = data.page_info.total
        return list
    }
}
