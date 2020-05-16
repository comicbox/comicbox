import { FunctionalComponent, h } from "preact";
import { useQuery } from "db";
import Dexie from "dexie";
import styles from "./series.module.scss";
import { Card, CardList } from "./card";

export const SeriesList: FunctionalComponent = () => {
    const series = useQuery('series', db => db.where('list').equals('READING')) ?? []

    return <CardList>
        {series.map(s => (
            <Series key={s.name} series={s.name} />
        ))}
    </CardList>
}

export const Series: FunctionalComponent<{ series: string }> = ({ series }) => {
    const book = useQuery('books',
        db => db.where(['series', 'read', 'sort'])
            .between(
                [series, 0, Dexie.minKey],
                [series, 0, Dexie.maxKey],
                true, true)
    )?.[0]

    if (book === undefined) {
        return <Card loading />
    }
    return <Card
        image={`/api/v1/book/${book.id}/page/0.jpg?height=200`}
        title={book.series}
        subtitle={`#${book.chapter} V${book.volume}`}
        link={`/v2/book/${book.id}`}
    />
}
