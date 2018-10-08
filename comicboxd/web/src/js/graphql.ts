import { message } from "css/error.scss";

export interface GraphqlResponse {
    data: { [name: string]: any }
}

interface query {
    query: string
    types: { [name: string]: string }
    variables: any
    success: (data: GraphqlResponse) => void
    fail: (data: QueryError) => void
}

let queries: query[] = [];

export function query(query: string, types?: { [name: string]: string }, variables?: any): Promise<any> {
    return new Promise(function (resolve, reject) {
        let name = query.trim().split(/[ :(]/, 2)[0]
        queries.push({
            query: query,
            variables: variables || {},
            types: types,
            success: data => {
                resolve(data.data[name]);
            },
            fail: err => {
                reject(err)
            },
        })
        if (queries.length === 1) {
            setTimeout(runQueries, 10)
        }
    });

}

async function runQueries() {
    let localQueries = queries;
    queries = [];

    let types: any[] = [];
    for (let q of localQueries) {
        for (const name in q.types) {
            if (q.types.hasOwnProperty(name)) {
                const type = q.types[name];

                types.push({
                    name: name,
                    type: type,
                })
            }
        }
    }

    let typesStr = types.reduce((acc: string, val) => acc += ` $${val.name}: ${val.type}`, "")

    if (typesStr !== "") {
        typesStr = `(${typesStr})`
    }

    let query = `query ${typesStr} {
        ${localQueries.map(q => q.query).join("\n")}
    }`

    let variables = {}
    for (let q of localQueries) {
        variables = { ...variables, ...q.variables }
    }
    // console.log(query, variables);

    let response = await fetch('/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: query,
            variables: variables,
        })
    })
    if (response.status < 200 || response.status > 299) {

        for (let q of localQueries) {
            q.fail(new QueryError(response, response.statusText))
        }
        return
    }

    console.log(response)
    let data = await response.json()

    if (data.errors !== undefined) {
        for (let q of localQueries) {
            q.fail(new QueryError(response, data.errors.map((err: any) => err.message).join(", ")))
        }
        return
    }

    for (let q of localQueries) {
        q.success(data)
    }
}

export class QueryError extends Error {
    status: number

    constructor(response: Response, message: string) {
        super(message)
        this.status = response.status
    }
}