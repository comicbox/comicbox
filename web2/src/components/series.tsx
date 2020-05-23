import { FunctionalComponent, h } from "preact";
import { useQuery, Series, db, Book } from "db";
import Dexie from "dexie";
import { BookCard, BookList, coverImage } from "./book";
import { range } from "utils";
import { CardList, Card } from "./card";
import { routeURL, routes } from "app";

// export const NextInSeriesList: FunctionalComponent<{ list: Series['list'] }> = props => {
//     const books = useQuery(
//         async () => {
//             const series = await db.series.where('list').equals(props.list).toArray()
//             const books = await Promise.all(
//                 series.map(s => db.books.where(['series', 'read', 'sort'])
//                     .between(
//                         [s.name, 0, Dexie.minKey],
//                         [s.name, 0, Dexie.maxKey],
//                         true, true)
//                     .first())
//             )
//             return books.filter((b): b is Book => b !== undefined)
//         },
//         []
//     )
//     return <BookList books={books.result} />
// }

export async function nextInSeries(series: Series[]): Promise<Book[]> {
    const books = await Promise.all(
        series.map(s => db.books.where(['series', 'read', 'sort'])
            .between(
                [s.name, 0, Dexie.minKey],
                [s.name, 0, Dexie.maxKey],
                true, true)
            .first())
    )
    return books.filter((b): b is Book => b !== undefined)
}

export const SeriesList: FunctionalComponent<{ series?: Series[] }> = props => {
    if (props.series === undefined) {
        return <CardList>
            {range(2).map(i => <SeriesCard key={i} series={undefined} />)}
        </CardList>
    }

    return <CardList>
        {props.series.map(s => (
            <SeriesCard key={s.name} series={s} />
        ))}
    </CardList>
}

export const SeriesCard: FunctionalComponent<{ series: Series | undefined }> = props => {
    const firstBook = useQuery(
        async (name) => {
            if (name === undefined) {
                return null
            }
            return db.books.where(['series', 'sort'])
                .between(
                    [name, Dexie.minKey],
                    [name, Dexie.maxKey],
                    true, true)
                .first()
        },
        [props.series?.name]
    )
    if (props.series === undefined) {
        return <Card loading />
    }

    let img: string | undefined

    if (firstBook.result) {
        img = coverImage(firstBook.result)
    }

    return <Card
        image={img ?? ''}
        title={props.series.name}
        link={routeURL(routes.series.view, { name: props.series.name })}
        unread={props.series.total - props.series.read || undefined}
    />
}
