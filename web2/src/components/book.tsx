import { FunctionalComponent, h } from "preact";
import { useQuery, Book } from "db";
import Dexie from "dexie";
import { Card, CardList } from "./card";
import { range } from "utils";

export const BookList: FunctionalComponent<{ books?: Book[] }> = props => {
    if (props.books === undefined) {
        return <CardList>
            {range(2).map(i => <BookCard key={i} book={undefined} />)}
        </CardList>
    }

    return <CardList>
        {props.books.map(b => (
            <BookCard key={b.id} book={b} />
        ))}
    </CardList>
}

export const BookCard: FunctionalComponent<{ book: Book | undefined }> = props => {

    if (props.book === undefined) {
        return <Card loading />
    }
    return <Card
        image={coverImage(props.book)}
        title={props.book.series}
        subtitle={`#${props.book.chapter} V${props.book.volume}`}
        link={`/v2/book/${props.book.id}`}
    />
}

export function coverImage(b: Book): string {
    return `/api/v1/book/${b.id}/page/0.jpg?height=200`
}
