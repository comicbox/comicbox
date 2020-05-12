import { FunctionalComponent, h } from "preact";
import { useAsync } from '../async-hook';
import { db, Book } from "../db";
import Dexie from "dexie";

async function getSeries(): Promise<string[]> {
    return Array.from(await db.books.orderBy('series').uniqueKeys()).map(String)
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
    return <div>
        {series.map(s => (
            <Series key={s} series={s} />
        ))}
    </div>
}

export const Series: FunctionalComponent<{ series: string }> = ({ series }) => {
    const book = useAsync(getFirstBook, [series]).result
    if (book === undefined) {
        return <div>
            Loading...
        </div>
    }
    return <div>
        <img src={`/api/v1/book/${book.id}/page/0.jpg?height=200`} alt="" loading="lazy" />
        {book.series} - #{book.chapter} V{book.volume}
    </div>
}
