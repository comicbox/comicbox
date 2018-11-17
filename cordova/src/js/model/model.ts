import { gql } from 'js/graphql'
import { QueryBuilder } from 'js/model/query-builder'

interface StaticThis<T> { new(...args: any): T }

export abstract class Model {

    public static types: { [key: string]: { type: string, jsType: any } }
    public static searchTypes: { [key: string]: { type: string, jsType?: any } } = {}

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

    public static where<T extends Model>(
        this: StaticThis<T>,
        field: string,
        value: string | number | boolean): QueryBuilder<T>
    public static where<T extends Model>(
        this: StaticThis<T>,
        field: string,
        operator: string,
        value?: string | number | boolean): QueryBuilder<T>
    public static where<T extends Model>(
        this: StaticThis<T>,
        field: string,
        operator: string,
        value?: string | number | boolean): QueryBuilder<T> {

        return (new QueryBuilder<T>(this)).where(field, operator, value)
    }

    public static select<T extends Model>(this: StaticThis<T>, ...args: string[]): QueryBuilder<T> {
        return (new QueryBuilder<T>(this)).select(...args)
    }

    public abstract get id(): string
    public abstract get link(): string
    public abstract get sortIndex(): string
    public fresh: boolean

    protected data: any = {}
    protected updatedData: any = {}
    protected hasUpdates: boolean = false

    constructor(data: any, fresh: boolean) {
        this.data = data
        this.fresh = fresh
    }

    public async save(): Promise<void> {
        const tableName = Object.getPrototypeOf(this).constructor.table
        if (!this.hasUpdates) {
            return
        }

        const newData = await gql(`
            user (id: $id user: $data){
                id
                name
                username
            }
        `, {
                id: 'ID',
                data: 'UserInput!',
            }, {
                id: this.id,
                data: this.updatedData,
            }, true)

        this.hasUpdates = false
        this.data = { ...this.data, ...this.updatedData }
        this.updatedData = {}
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
                this.hasUpdates = true
                this.updatedData[key] = value
            },
            get: function () {
                return this.updatedData[key] || this.data[key]
            },
        }

    }
}

export function table(tableName: string, mutationName: string, insertType: string, primaryType: string = 'ID'): any {
    return (target: any) => {
        target.prototype.constructor.table = tableName

        return target
    }
}

export function modelSort(a: Model, b: Model): number {
    return a.sortIndex.localeCompare(b.sortIndex)
}
