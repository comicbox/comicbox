import { gql } from 'js/graphql'
import { QueryBuilder } from 'js/model/query-builder'

export interface Type {
    type: string
    jsType?: StaticModel<any>
}
export interface StaticModel<T> {
    types: Dictionary<Type>
    searchTypes: Dictionary<Type>
    table: string
    new(data: any, fresh: boolean): T
}

export abstract class Model {

    public static readonly types: Dictionary<Type>
    public static readonly searchTypes: Dictionary<Type> = {}
    public static readonly table: string

    public static async find<T extends Model>(this: StaticModel<T>, id: string, fresh: boolean = true): Promise<T> {
        const models = await (new QueryBuilder<T>(this)).where('id', id).take(1).get()
        return models[0] || null
    }

    public static where<T extends Model>(
        this: StaticModel<T>,
        field: string,
        value: string | number | boolean): QueryBuilder<T>
    public static where<T extends Model>(
        this: StaticModel<T>,
        field: string,
        operator: string,
        value?: string | number | boolean): QueryBuilder<T>
    public static where<T extends Model>(
        this: StaticModel<T>,
        field: string,
        operator: string,
        value?: string | number | boolean): QueryBuilder<T> {

        return (new QueryBuilder<T>(this)).where(field, operator, value)
    }

    public static select<T extends Model>(this: StaticModel<T>, ...args: string[]): QueryBuilder<T> {
        return (new QueryBuilder<T>(this)).select(...args)
    }

    public static sort<T extends Model>(this: StaticModel<T>, ...columns: string[]): QueryBuilder<T> {
        return (new QueryBuilder<T>(this)).sort(...columns)
    }

    public static take<T extends Model>(this: StaticModel<T>, num: number): QueryBuilder<T> {
        return (new QueryBuilder<T>(this)).take(num)
    }

    public static skip<T extends Model>(this: StaticModel<T>, num: number): QueryBuilder<T> {
        return (new QueryBuilder<T>(this)).skip(num)
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
        const TClass = Object.getPrototypeOf(this).constructor

        const mutationName = TClass.mutationName
        const insertType = TClass.insertType
        const primaryType = TClass.primaryType
        const primaryName = TClass.primaryName

        if (!this.hasUpdates) {
            return
        }
        // const qb = new QueryBuilder(this)

        // ${qb.generateGQL(TClass).join(', ')}
        const newData = await gql(`
            ${mutationName} (${primaryName}: $id ${mutationName}: $data) {
                ${(new QueryBuilder(TClass)).generateGQL(TClass)}
            }
            `, {
                id: primaryType,
                data: insertType,
            }, {
                id: this.id,
                data: this.updatedData,
            }, true)

        this.hasUpdates = false
        this.data = { ...this.data, ...this.updatedData, ...newData }
        this.updatedData = {}
    }
}

interface PropOptions {
    jsType?: any
    writeOnly?: boolean
}

export function prop(type: string, options: PropOptions = {}): any {
    return (target: any, key: string) => {

        if (!target.constructor.types) {
            target.constructor.types = {}
        }

        target.constructor.types[key] = {
            type: type,
            jsType: options.jsType,
            writeOnly: options.writeOnly,
        }

        const ret: { get?: () => any, set?: (value: any) => void } = {}

        if (!options.writeOnly) {
            ret.get = function () {
                return this.updatedData[key] || this.data[key]
            }
        }

        ret.set = function (value: any) {
            this.hasUpdates = true
            this.updatedData[key] = value
        }

        return ret

    }
}

export function table(
    tableName: string,
    mutationName: string,
    insertType: string,
    primaryName: string = 'id',
    primaryType: string = 'ID'): any {

    return (target: any) => {
        target.prototype.constructor.table = tableName
        target.prototype.constructor.mutationName = mutationName
        target.prototype.constructor.insertType = insertType
        target.prototype.constructor.primaryName = primaryName
        target.prototype.constructor.primaryType = primaryType

        return target
    }
}

export function modelSort(a: Model, b: Model): number {
    return a.sortIndex.localeCompare(b.sortIndex)
}

export interface PageInfo {
    total: number
    skip: number
    take: number
}

// tslint:disable-next-line:max-classes-per-file
export class ModelArray<T> extends Array<T> {
    get total() {
        return this.page_info.total
    }
    get skip() {
        return this.page_info.skip
    }
    get take() {
        return this.page_info.take
    }
    private page_info: PageInfo
    constructor(results: T[], page_info: PageInfo) {
        super(...([] as T[]).concat(results))
        this.page_info = page_info
    }
}
