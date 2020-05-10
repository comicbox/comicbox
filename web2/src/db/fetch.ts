
export async function fetchQuery(query: string, variables: any): Promise<Response> {
    const r = await fetch('/graphql', {
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

    if (r.status === 401) {
        throw new Error('you must login')
    }
    if (!r.ok) {
        throw new Error(await r.text())
    }

    return r
}


export async function* ittrQuery() {
    let skip = 0
    const take = 1000
    let results: any

    do {
        results = await fetchQuery(`{
            books(take: ${take} skip: ${skip}) {
                results {
                    id
                    updated_at
                    series
                    title
                    volume
                    chapter
                    cover {
                        url
                    }
                }
            }
        }`, {}).then(r => r.json())


        for (const book of results.data.books.results) {
            yield book
        }

        skip += take
    } while (results.data.books.results.length >= take)

}