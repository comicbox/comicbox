import { FunctionalComponent, h } from "preact"
import { NextInSeriesList } from "../components/series"
import { useQuery, db } from "db"
import { BookList } from "components/book"

export const Home: FunctionalComponent = () => {
    const newBook = useQuery(
        () => db.books.orderBy('created_at').limit(15).toArray(),
        []
    )

    return <div>
        <h1>Reading</h1>
        <NextInSeriesList list='READING' />
        <h1>Paused</h1>
        <NextInSeriesList list='PAUSED' />
        <h1>New Books</h1>
        <BookList books={newBook.result} />
    </div>
}