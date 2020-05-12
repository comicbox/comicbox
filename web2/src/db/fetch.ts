import { db, Book } from "."

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


export async function* ittrQuery(): AsyncIterable<Book[]> {
    let maxChange = (await db.change.get('books'))?.change ?? 0
    const take = 1000
    let results: any

    do {
        results = await fetchQuery(`{
            books(take: ${take} change_after: ${maxChange} sort: "change") {
                results {
                    id
                    change
                    series
                    title
                    volume
                    chapter
                    pages {
                        type
                        file_number
                    }
                    sort
                    read
                }
            }
        }`, {}).then(r => r.json())

        for (const book of results.data.books.results) {
            maxChange = Math.max(maxChange, book.change)
        }
        yield results.data.books.results
    } while (results.data.books.results.length >= take)

    db.change.put({
        table: 'books',
        change: maxChange,
    })
}