import { FunctionalComponent, h } from "preact";
import { useAsync } from '../async-hook';
import { db, Book } from "../db";
import Dexie from "dexie";
import styles from "./series.module.scss";
import { Card, CardList } from "./card";

async function getSeries(): Promise<string[]> {
    return Array.from(await db.books.orderBy('series').uniqueKeys()).map(String).slice(0, 20)
}

async function getFirstBook(series: string): Promise<Book | undefined> {
    return await db.books.where(['series', 'read', 'sort'])
        .between(
            [series, 0, Dexie.minKey],
            [series, 0, Dexie.maxKey],
            true, true)
        .first();
}

export const SeriesList: FunctionalComponent = () => {
    const series = useAsync(getSeries, []).result ?? []
    return <CardList>
        {series.map(s => (
            <Series key={s} series={s} />
        ))}
    </CardList>
}

export const Series: FunctionalComponent<{ series: string }> = ({ series }) => {
    const book = useAsync(getFirstBook, [series]).result
    if (book === undefined) {
        return <div>
            Loading...
        </div>
    }
    return <Card
        image={`/api/v1/book/${book.id}/page/0.jpg?height=200`}
        title={book.series}
        subtitle={`#${book.chapter} V${book.volume}`}
        link={`/v2/book/${book.id}`}
    />
}
