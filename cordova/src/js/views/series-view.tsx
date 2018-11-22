import * as s from 'css/series-view.scss'
import ModelList from 'js/components/model-list'
import { gql } from 'js/graphql'
import Book from 'js/model/book'
import { ModelArray } from 'js/model/model'
import Layout from 'js/views/layout'
import { Component, h } from 'preact'

interface Props {
    matches?: { [name: string]: string }
}

interface State {
    current: Book
    books: ModelArray<Book>
}

export default class SeriesView extends Component<Props, State> {

    public async componentDidMount() {
        const series = this.props.matches.name
        const [book, books] = await Promise.all([
            Book.where('series', series)
                .where('read', false)
                .select('series', 'cover', 'chapter', 'volume', 'title', 'summary')
                .first(),
            Book.where('series', series)
                .select('series', 'cover', 'chapter', 'volume', 'title')
                .take(100)
                .get(),
        ])

        this.setState({
            current: book,
            books: books,
        })
    }

    public render() {
        const series = this.props.matches.name
        let currentBook = null

        if (this.state.current !== undefined) {
            // currentBook = <ModelList items={[this.state.current]} key={series + 'current'} />
            const book = this.state.current
            // if (book.)
            currentBook = <div class={s.current}>
                <img src={book.cover.url} alt='cover' class={s.cover} />
                <div>{book.chapter}</div>
                <div>{book.summary}</div>
            </div>
        }

        return <Layout backLink='/series'>
            <h1>{series}</h1>
            {currentBook}
            <ModelList
                items={this.state.books}
                key={series + 'books' + this.state.books}
            />
        </Layout >
    }

}
