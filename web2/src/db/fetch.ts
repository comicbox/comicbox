import { Database, db, Book, ExtractType } from "."
import { generate, prepare, GraphQLQuery } from "./graphql"

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

export async function* ittrQuery<Name extends KeyOfType<Database, Dexie.Table>>(name: Name, selects: Array<string | GraphQLQuery>): AsyncIterable<ExtractType<Database[Name]>[]> {
    let maxChange = (await db.change.get(name)) ?? { table: name, change: 0 }
    const take = 1000
    let items: any[]

    do {
        const results = await fetchQuery(generate(
            prepare('query', {},
                prepare(name, {
                    take: take,
                    change_after: maxChange.change,
                    sort: "change"
                },
                    prepare('results', {}, ...selects)
                )
            )
        ), {}).then(r => r.json())

        items = results.data[name].results
        for (const item of items) {
            if (maxChange < item.change) {
                maxChange.change = item.change
                // maxChange.skip = 0
            } else {
                // maxChange.skip++
            }
        }
        yield items
    } while (items.length >= take)

    db.change.put(maxChange)
}