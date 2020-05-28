import { FunctionalComponent, h } from "preact";
import { useQuery, Book } from "db";
import Dexie from "dexie";
import { Card, CardList } from "./card";
import { range } from "utils";
import { routeURL, routes } from "app";

export const BookList: FunctionalComponent<{ books?: Book[], large?: boolean }> = props => {
    if (props.books === undefined) {
        return <CardList large={props.large}>
            {range(2).map(i => <BookCard key={i} book={undefined} />)}
        </CardList>
    }

    return <CardList large={props.large}>
        {props.books.map(b => (
            <BookCard key={b.id} book={b} />
        ))}
    </CardList>
}

export const BookCard: FunctionalComponent<{ book: Book | undefined }> = props => {

    if (props.book === undefined) {
        return <Card loading />
    }

    let subtitle = ''
    if (props.book.chapter) {
        subtitle += '#' + props.book.chapter
    }
    if (props.book.volume) {
        if (subtitle !== '') {
            subtitle += ' '
        }
        subtitle += 'V' + props.book.volume
    }
    if (props.book.title) {
        if (subtitle !== '') {
            subtitle += ' - '
        }
        subtitle += props.book.title
    }

    return <Card
        image={coverImage(props.book)}
        title={props.book.series}
        subtitle={subtitle}
        link={routeURL(routes.books.view, { id: props.book.id, page: props.book.current_page })}
        unread={!props.book.read}
    />
}

export function coverImage(b: Book): string {
    for (const page of b.pages) {
        if (page.type !== 'Deleted') {
            return pageImage(b, page.file_number)
        }
    }
    return pageImage(b, 0)
}
export function pageImage(b: Book, number: number): string {
    return `/api/v1/book/${b.id}/page/${number}.jpg`
}
