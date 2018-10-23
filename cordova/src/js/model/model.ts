import { gql } from 'js/graphql'
import { QueryBuilder } from 'js/model/query-builder'
import { map } from 'lodash'

interface StaticThis<T> { new(...args: any): T }

export abstract class Model {

    public static types: { [key: string]: { type: string, jsType: any } }

    public static async find<T extends Model>(this: StaticThis<T>, id: string): Promise<T> {
        const model = await (new QueryBuilder<T>(this)).where('id', id).take(1).get()
        if (model.length === 0) {
            return null
        }
        return model[0] as T
    }

    public static where<T extends Model>(this: StaticThis<T>, ...args: string[]): QueryBuilder<T> {
        return (new QueryBuilder<T>(this)).where(...args)
    }

    public static select<T extends Model>(this: StaticThis<T>, ...args: string[]): QueryBuilder<T> {
        return (new QueryBuilder<T>(this)).select(...args)
    }

    protected data: any = {}

    private bulkQueryName: string

    constructor(data: any) {
        this.data = data
    }
}

export function prop(type: string, jsType?: any): any {
    return (target: any, key: string) => {

        if (!target.constructor.types) {
            target.constructor.types = {}
        }
        target.constructor.types[key] = { type: type, jsType: jsType }

        return {
            set: function (value: any) {
                this.data[key] = value
            },
            get: function () {
                return this.data[key]
            },
        }

    }
}

export function table(tableName: string): any {
    return (target: any) => {
        target.prototype.constructor.table = tableName

        return target
    }
}
