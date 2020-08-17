import { FunctionalComponent, h } from "preact";
import { useQuery, Book, db } from "db";
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

function pageNumber(b: Book, number: number): number {
    let currentPage = 0
    for (const page of b.pages) {
        if (page.type === 'Deleted') {
            continue
        }
        if (currentPage === number) {
            return page.file_number
        }
        currentPage++
    }
    return number
}

export function coverImage(b: Book): string {
    return pageImage(b, 0)
}

export function pageImage(b: Book, number: number): string {
    return `/api/v1/book/${b.id}/page/${number}.jpg`
}

export async function previousBook(b: Book): Promise<Book | undefined> {
    const pBook = await db.books.where(['series', 'sort'])
        .below([b.series, b.sort])
        .last()
    if (pBook?.series !== b.series) {
        return undefined
    }
    return pBook
}

export async function nextBook(b: Book): Promise<Book | undefined> {
    const nBook = await db.books.where(['series', 'sort'])
        .above([b.series, b.sort])
        .first()
    if (nBook?.series !== b.series) {
        return undefined
    }
    return nBook
}
