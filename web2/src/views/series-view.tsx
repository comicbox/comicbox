import { BookList } from 'components/book'
import { Layout } from 'components/layout'
import { db, useQuery } from 'db'
import Dexie from 'dexie'
import { FunctionalComponent, h } from 'preact'
import { Error404 } from './error'

interface Props {
    matches: {
        name: string
    }
}

export const SeriesView: FunctionalComponent<Props> = props => {
    const books = useQuery(
        name =>
            db.books
                .where(['series', 'sort'])
                .between([name, Dexie.minKey], [name, Dexie.maxKey], true, true)
                .toArray(),
        [props.matches.name],
    )

    const series = useQuery(
        name => db.series.where('name').equals(name).first(),
        [props.matches.name],
    )
    console.log(series)
    if (series.loading) {
        return (
            <Layout>
                <h1>Loading...</h1>
                <BookList />
            </Layout>
        )
    } else {
        if (series.error) {
            return <Error404 />
        }
        if (series.result === undefined) {
            return <Error404 />
        }
    }

    return (
        <Layout>
            <h1>{series.result.name}</h1>
            <BookList books={books.result} />
        </Layout>
    )
}
