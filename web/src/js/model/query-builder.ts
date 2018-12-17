import { gql } from 'js/graphql'
import { Model, ModelArray, StaticModel, Type } from 'js/model/model'
import { str_random } from 'js/util'
import map from 'lodash/map'
import { first } from 'lodash-es';

interface Where {
    field: string
    value: string | number | boolean
    type: Type
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
    private TClass: StaticModel<T>
    private wheres: Where[] = []
    private selects: string[] = []
    private withs: Array<QueryBuilder<any>> = []

    private _skip: number = 0
    private _take: number = 100
    private _sort: string[] = []

    constructor(TClass: StaticModel<T>) {
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

    public where(field: string, value: string | number | boolean): QueryBuilder<T> {
        const where: Where = {
            field: field,
            value: value,
            type: this.TClass.types[field] || this.TClass.searchTypes[field],
        }

        if (field === 'search') {
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

    public getQuery(prefix?: string): [string, Dictionary<string>, Dictionary<string | number | boolean>] {
        const types: Dictionary<string> = {}
        const variables: Dictionary<string | number | boolean> = {}
        let withTypes: Dictionary<string> = {}
        let withVariables: Dictionary<string | number | boolean> = {}
        let selects: string[] = []

        for (const where of this.wheres) {
            const field = where.field
            variables[field] = where.value
            if (field === 'search') {
                types[field] = 'String'
            } else {
                switch (where.type.type) {
                    case 'String':
                        types[field] = 'Regex'
                        break
                    case 'Int':
                    case 'Float':
                        types[field] = 'NumberRange'
                        break
                    default:
                        types[field] = where.type.type
                }
            }

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
                if (type.jsType === undefined) {
                    selects.push(select)
                } else {
                    selects.push(`${select} {${this.generateGQL(type.jsType).join(', ')}}`)
                }
            }
        }

        const withSelects: string[] = []
        for (const qb of this.withs) {
            const [q, t, v] = qb.getQuery(str_random(5))
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

        const vars = map(types, (_, key) => `${key.replace(prefix + '_', '')}: $${key}`).join(', ')
        const query = `${this.TClass.table} (${vars}) {
            total
            results {
                ${selects.concat(withSelects).join('\n                ')}
            }
        }`
        // console.log(query);

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
        }).filter(select => select !== undefined) as string[]

    }

    private buildResult(jsType: StaticModel<any>, data: any): ModelArray<T> {
        const elements: T[] = []

        for (const element of [].concat(data.results) as any[]) {
            map(jsType.types, (type, key) => {
                if (!element[key]) { return }
                if (type.jsType && type.jsType.prototype instanceof Model) {
                    element[key] = this.buildResult(type.jsType, element[key])
                } else if (type.type === 'DateTime') {
                    element[key] = new Date(element[key])
                }

            })
            elements.push(new jsType(element, true))
        }

        return new ModelArray(elements, {
            total: data.total,
            skip: this._skip,
            take: this._take,
        })
    }
}
