import { FunctionalComponent, h } from "preact";
import { useQuery, Series, db, Book } from "db";
import Dexie from "dexie";
import { BookCard, BookList } from "./book";
import { range } from "utils";

export const NextInSeriesList: FunctionalComponent<{ list: Series['list'] }> = props => {
    const books = useQuery(
        async () => {
            const series = await db.series.where('list').equals(props.list).toArray()
            const books = await Promise.all(
                series.map(s => db.books.where(['series', 'read', 'sort'])
                    .between(
                        [s.name, 0, Dexie.minKey],
                        [s.name, 0, Dexie.maxKey],
                        true, true)
                    .first())
            )
            return books.filter((b): b is Book => b !== undefined)
        },
        []
    )
    return <BookList books={books.result} />
}