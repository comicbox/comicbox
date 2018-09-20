
export interface GraphqlResponse {
    data: { [name: string]: any }
}

export async function Exec(query: string, variables?: any): Promise<GraphqlResponse> {
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
    return data
}