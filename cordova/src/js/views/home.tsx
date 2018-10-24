import ModelList from 'js/components/model-list'
import Book from 'js/model/book'
import Series from 'js/model/series'
import Layout from 'js/views/layout'
import { Component, h } from 'preact'

export default class Home extends Component {

    public render() {

        return <Layout backLink='/'>
            <h1>Home</h1>
            <ModelList items={firstBook(Series.where('list', 'READING').get())} />
        </Layout >
    }
}

async function* firstBook(series: AsyncIterableIterator<Series>): AsyncIterableIterator<Book> {
    for await (const serie of series) {

        if (serie.books.length > 0) {
            yield new Book(serie.books[0], serie.fresh)
        }
    }
}
