import { str_random } from 'js/util'
import url from './url'

export interface GraphqlResponse {
    data: { [name: string]: any }
}

type GQLType = 'query' | 'mutation'

interface Query {
    name: string
    query: string
    types: Dictionary<string>
    variables: any
    gqlType: GQLType
    success: (data: GraphqlResponse) => void
    fail: (data: QueryError) => void
}

let queries: Query[] = []

export function gql(
    query: string,
    types?: Dictionary<string>,
    variables?: any,
    mutation: boolean = false): Promise<any> {

    return new Promise((resolve, reject) => {

        const name = query.trim().split(/[ :(]/, 2)[0]
        queries.push({
            name: name,
            query: query,
            variables: variables || {},
            types: types,
            gqlType: mutation ? 'mutation' : 'query',
            success: data => {
                resolve(data)
            },
            fail: err => {
                reject(err)
            },
        })
        if (queries.length === 1) {
            setTimeout(() => {
                runQueries('query', queries.filter(q => q.gqlType === 'query'))
                runQueries('mutation', queries.filter(q => q.gqlType === 'mutation'))
                queries = []
            }, 50)
        }
    })

}

// export async function mutation<T extends Dictionary<any>>(table: string, data: T, primary: string = 'id'):Promise<T>{

//     const response = await fetchQuery(`mutation ($data: UserInput! $primary: string){
//             ${table} (${primary}: $primary ${table}: $data) {
//                 id
//             }
//         }`, {
//             primary: data[primary],
//             data: data,
//         })

//     if (response.status < 200 || response.status > 299) {
//         throw new QueryError(response, response.statusText)
//     }

//     return null
// }

async function runQueries(gqlType: GQLType, localQueries: Query[]) {
    if (localQueries.length === 0) {
        return
    }
    const types: any[] = []
    const variables: any = {}
    for (const q of localQueries) {
        q.name = `${q.name}_${str_random()}`
        q.query = `${q.name}: ${q.query}`

        for (const name in q.types) {
            if (q.types.hasOwnProperty(name)) {
                const type = q.types[name]
                const newName = `${name}_${str_random()}`

                q.query = q.query.replace(new RegExp('\\$' + name, 'g'), '$' + newName)

                variables[newName] = q.variables[name]

                types.push({
                    name: newName,
                    type: type,
                })
            }
        }
    }

    let typesStr = types.reduce((acc: string, val) => acc += ` $${val.name}: ${val.type}`, '')

    if (typesStr !== '') {
        typesStr = `(${typesStr})`
    }

    const query = `${gqlType} ${typesStr} {
        ${localQueries.map(q => q.query).join('\n')}
    }`
    try {
        const response = await fetchQuery(query, variables)

        if (response.status < 200 || response.status > 299) {

            for (const q of localQueries) {
                q.fail(new QueryError(response, response.statusText))
            }
            return
        }

        const data = await response.json()

        if (data.errors !== undefined) {
            for (const q of localQueries) {
                q.fail(new QueryError(response, data.errors.map((err: any) => err.message).join(', ')))
            }
            return
        }

        for (const q of localQueries) {
            q.success(data.data[q.name])
        }

    } catch (e) {

        for (const q of localQueries) {
            q.fail(new QueryError(null, e))
        }
        return
    }

}

async function fetchQuery(query: string, variables: any): Promise<Response> {
    return await fetch(await url('/graphql'), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: query,
            variables: variables,
        }),
    })
}

export class QueryError extends Error {
    private status: number

    constructor(response: Response, message: string) {
        super(message)
        if (response !== null) {
            this.status = response.status
        } else {
            this.status = 0
        }
    }
}
