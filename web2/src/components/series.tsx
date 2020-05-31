import { FunctionalComponent, h } from "preact";
import { useQuery, Series, db, Book } from "db";
import Dexie from "dexie";
import { BookCard, BookList, coverImage } from "./book";
import { range } from "utils";
import { CardList, Card } from "./card";
import { routeURL, routes } from "app";

export type SeriesWithBook = Series & {
    book: Book | undefined
}

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

export async function loadFirstBook(series: Series[]): Promise<Array<SeriesWithBook>> {
    const books = await Promise.all(
        series.map(s => {
            return db.books.where(['series', 'sort'])
                .between(
                    [s.name, Dexie.minKey],
                    [s.name, Dexie.maxKey],
                    true, true)
                .first()
        })
    )


    return series.map((s, i) => {
        return { ...s, book: books[i] }
    })
}

export const SeriesList: FunctionalComponent<{ series?: Series[] }> = props => {
    const seriesWithBooks = useQuery(async series => {
        if (series === undefined) {
            return undefined
        }
        return loadFirstBook(series)
    }, [props.series])

    if (seriesWithBooks.result === undefined) {
        return <CardList>
            {range(2).map(i => <SeriesCard key={i} series={undefined} />)}
        </CardList>
    }

    return <CardList>
        {seriesWithBooks.result.map(s => (
            <SeriesCard key={s.name} series={s} />
        ))}
    </CardList>
}

export const SeriesCard: FunctionalComponent<{ series: SeriesWithBook | undefined }> = props => {
    if (props.series === undefined) {
        return <Card loading />
    }

    let img: string | undefined

    if (props.series.book) {
        img = coverImage(props.series.book)
    }

    return <Card
        image={img ?? ''}
        title={props.series.name}
        link={routeURL(routes.series.view, { name: props.series.name })}
        unread={props.series.total - props.series.read}
    />
}
