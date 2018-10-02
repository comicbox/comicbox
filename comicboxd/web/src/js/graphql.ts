
export interface GraphqlResponse {
    data: { [name: string]: any }
}

interface query {
    query: string
    variables: any
    callback: (data: GraphqlResponse) => void
}

let queries: query[] = [];

export function query(query: string, variables?: any): Promise<any> {
    return new Promise(function (resolve, reject) {
        let name = query.trim().split(/[ :(]/, 2)[0]
        queries.push({
            query: query,
            variables: variables || {},
            callback: data => {
                resolve(data.data[name]);
            }
        })
        if (queries.length === 1) {
            setTimeout(runQueries, 10)
        }
    });

}

async function runQueries() {
    let query = `query {
        ${queries.map(q => q.query).join("\n")}
    }`

    let variables = {}
    for (let q of queries) {
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

    let data = await response.json()

    if (data.errors !== undefined) {
        throw data.errors.map((err: any) => err.message).join(", ")
    }

    for (let q of queries) {
        q.callback(data)
    }
}