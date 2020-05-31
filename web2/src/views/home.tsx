import { FunctionalComponent, h } from "preact"
import { nextInSeries } from "../components/series"
import { useQuery, db } from "db"
import { BookList } from "components/book"
import { Layout } from "components/layout"

export const Home: FunctionalComponent = () => {
    const result = useQuery(
        async () => {
            const newBooks = await db.books.orderBy('created_at').limit(15).toArray()
            const series = await db.series.where('list').equals('READING').toArray()
            const readingBooks = (await nextInSeries(series)).sort((a, b) => b.change - a.change)
            console.log(readingBooks.map(b => b.change));

            return [newBooks, readingBooks] as const
        },
        []
    )

    const [newBooks, readingBooks] = result.result ?? []

    return <Layout>
        <h1>Reading</h1>
        <BookList books={readingBooks} large />
        <h1>New Books</h1>
        <BookList books={newBooks} />
    </Layout>
}