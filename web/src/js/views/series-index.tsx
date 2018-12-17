import ModelList from 'js/components/model-list'
import Book from 'js/model/book'
import Series from 'js/model/series'
import Layout from 'js/views/layout'
import { Component, h } from 'preact'

export default class SeriesIndex extends Component {

    public render() {
        const series = Series
            .select('name', 'read', 'total')
            .where('name', '.+')
            .with(Book.take(1).select('cover'))

        return <Layout backLink='/'>
            <h1>Series</h1>
            <ModelList items={series} />
        </Layout >
    }

}
