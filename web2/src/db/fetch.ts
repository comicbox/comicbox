import { Database, db, Book, ExtractType } from "."
import { prepare, GraphQLQuery, run } from "./graphql"

export async function* ittrQuery<Name extends KeyOfType<Database, Dexie.Table>>(name: Name, selects: Array<string | GraphQLQuery>): AsyncIterable<ExtractType<Database[Name]>[]> {
    let maxChange = (await db.change.get(name)) ?? { table: name, change: -1 }
    const take = 1000
    let items: any[]

    do {
        const results = await run(
            prepare('query', {},
                prepare(name, {
                    take: take,
                    change_after: maxChange.change,
                    sort: "change"
                },
                    prepare('results', {}, ...selects)
                )
            )
        ).then(r => r.json())

        items = results.data[name].results
        for (const item of items) {
            if (maxChange.change < item.change) {
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