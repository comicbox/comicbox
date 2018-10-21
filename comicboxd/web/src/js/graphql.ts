import { str_random } from 'js/util'

export interface GraphqlResponse {
    data: { [name: string]: any }
}

interface Query {
    name: string
    query: string
    types: { [name: string]: string }
    variables: any
    success: (data: GraphqlResponse) => void
    fail: (data: QueryError) => void
}

let queries: Query[] = []

export function gql(query: string, types?: { [name: string]: string }, variables?: any): Promise<any> {
    return new Promise((resolve, reject) => {
        const name = query.trim().split(/[ :(]/, 2)[0]
        queries.push({
            name: name,
            query: query,
            variables: variables || {},
            types: types,
            success: data => {
                resolve(data)
            },
            fail: err => {
                reject(err)
            },
        })
        if (queries.length === 1) {
            setTimeout(runQueries, 50)
        }
    })

}

async function runQueries() {
    const localQueries = queries
    queries = []

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

    const query = `query ${typesStr} {
        ${localQueries.map(q => q.query).join('\n')}
    }`

    const response = await fetch('/graphql', {
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
}

export class QueryError extends Error {
    private status: number

    constructor(response: Response, message: string) {
        super(message)
        this.status = response.status
    }
}
