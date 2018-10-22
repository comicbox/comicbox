import * as s from 'css/home.scss'
import { BookData } from 'js/components/book'
import BookList from 'js/components/book-list'
import { gql } from 'js/graphql'
import Layout from 'js/views/layout'
import { Component, h } from 'preact'

const ListTypes = { series: 'String' }
const ListQuery = `
books(take: 1 series: $series read: false) {
  results {
    id
    title
    volume
    chapter
    series
    cover {
      url
    }
    read
  }
}
`

interface Props {
    matches?: { [name: string]: string }
}

interface State {
    current: BookData
}

export default class SeriesView extends Component<Props, State> {

    public componentDidMount() {
        gql(ListQuery, ListTypes, {
            series: this.props.matches.name,
        }).then(books => {
            const book = books.results[0]
            if (book !== undefined) {
                this.setState({ current: book })
            }
        })
    }

    public render() {
        let currentBook = null
        if (this.state.current !== undefined) {
            currentBook = <BookList books={[this.state.current]} />
        }
        return <Layout backLink='/series'>
            <h1>{this.props.matches.name}</h1>
            {currentBook}
            <BookList series={this.props.matches.name} />
        </Layout >
    }

}
