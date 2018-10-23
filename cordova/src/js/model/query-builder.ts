import { gql } from 'js/graphql'
import { Model } from 'js/model/model'
import { map } from 'lodash'

interface Where {
    field: string
    operator: string
    value: string | number
    type: string
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

    public async get(): Promise<T[]> {

        const types: { [key: string]: string } = {}
        const variables: { [key: string]: string | number } = {}

        for (const where of this.wheres) {
            const field = where.field + opConv[where.operator]
            types[field] = where.type
            variables[field] = where.value
        }

        const query = `${this.TClass.table}(take: 100 ${map(types, (type, key) => `${key}: $${key}`).join(', ')}) {
            results {
                ${map(this.TClass.types, (type, key) => key).join(', ')}
            }
        }`

        console.log('get', query, types, variables)

        const data = await gql(query, types, variables)
        console.log(data)

        return data.results.map((result: any) => new this.TClass(result))
    }
}
