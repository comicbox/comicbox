import { QueryBuilder } from 'js/model/query-builder'

interface StaticThis<T> { new(...args: any): T }

export abstract class Model {

    public static types: { [key: string]: { type: string, jsType: any } }

    public static async find<T extends Model>(this: StaticThis<T>, id: string, fresh: boolean = true): Promise<T> {
        const list = await (new QueryBuilder<T>(this)).where('id', id).take(1).get()
        const result = await list.next()

        if (result.done) {
            return null
        }

        if (!result.value.fresh && fresh) {
            const newResult = await list.next()
            if (!newResult.done) {
                return newResult.value
            }
        }
        return result.value
    }

    public static where<T extends Model>(this: StaticThis<T>, ...args: string[]): QueryBuilder<T> {
        return (new QueryBuilder<T>(this)).where(...args)
    }

    public static select<T extends Model>(this: StaticThis<T>, ...args: string[]): QueryBuilder<T> {
        return (new QueryBuilder<T>(this)).select(...args)
    }

    protected data: any = {}
    protected fresh: boolean

    constructor(data: any, fresh: boolean) {
        this.data = data
        this.fresh = fresh
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
