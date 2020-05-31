import { FunctionalComponent, h } from "preact"
import { useQuery, db } from "db"
import { BookList } from "components/book"
import { Layout } from "components/layout"
import Dexie from "dexie"

interface Props {
    matches: {
        name: string
    }
}

export const SeriesView: FunctionalComponent<Props> = props => {
    const books = useQuery(
        (name) => db.books.where(['series', 'sort'])
            .between(
                [name, Dexie.minKey],
                [name, Dexie.maxKey],
                true, true)
            .toArray(),
        [props.matches.name]
    )

    return <Layout>
        <h1>Series</h1>
        <BookList books={books.result} />
    </Layout>
}