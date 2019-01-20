import ModelList from 'js/components/model-list'
import Book from 'js/model/book'
import Series from 'js/model/series'
import Layout from 'js/views/layout'
import { Component, h } from 'preact'

export default class SearchIndex extends Component<any> {

    public render() {
        const query = this.props.matches.query
        const series = Series
            .where('search', new RegExp(query))
            .with(Book.take(1))
            .take(10)
            .get()
        const books = Book
            .where('search', new RegExp(query))
            .take(20)
            .get()

        return <Layout backLink='/' breadcrumbs={[]}>
            <h1>Search</h1>
            <h2>Series</h2>
            <ModelList items={series} key={query + 'series'} />
            <h2>Books</h2>
            <ModelList items={books} key={query + 'books'} />
        </Layout >
    }

}
