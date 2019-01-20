import ModelList from 'js/components/model-list'
import Book from 'js/model/book'
import { ModelArray } from 'js/model/model'
import Series from 'js/model/series'
import Layout from 'js/views/layout'
import { Component, h } from 'preact'

export default class Home extends Component {

    public render() {
        const reading = Series
            .where('list', 'READING')
            .with(Book.where('read', false).take(1))
            .get()
        const paused = Series
            .where('list', 'PAUSED')
            .with(Book.where('read', false).take(1))
            .get()

        // Book.take(1).with(Series.select('name')).first().then(console.log)

        return <Layout backLink='/' breadcrumbs={[]}>
            <h1>Current</h1>
            <ModelList items={firstBook(reading)} />
            <h1>Paused</h1>
            <ModelList items={firstBook(paused)} />
            <h1>New Chapters</h1>
            <ModelList items={Book.sort('!created_at').take(15).get()} />
        </Layout >
    }
}

async function firstBook(seriesP: Promise<ModelArray<Series>>): Promise<Book[]> {
    const series = await seriesP
    return series.filter(s => s.books.length > 0).map(s => s.books[0])
}

// async function* firstBook(series: AsyncIterableIterator<Series>): AsyncIterableIterator<Book> {
//     for await (const serie of series) {

//         if (serie.books.length > 0) {
//             yield new Book(serie.books[0], serie.fresh)
//         }
//     }
// }
