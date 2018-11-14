import ModelList from 'js/components/model-list'
import Book from 'js/model/book'
import Series from 'js/model/series'
import Layout from 'js/views/layout'
import { Component, h } from 'preact'

export default class SearchIndex extends Component<any> {

    public render() {
        const query = this.props.matches.query
        const series = Series.where('search', query).take(10).get({ cache: false })
        const books = Book.where('search', query).take(20).get({ cache: false })

        return <Layout backLink='/'>
            <h1>Search</h1>
            <h2>Series</h2>
            <ModelList items={series} key={query + 'series'} />
            <h2>Books</h2>
            <ModelList items={books} key={query + 'books'} />
        </Layout >
    }

}
