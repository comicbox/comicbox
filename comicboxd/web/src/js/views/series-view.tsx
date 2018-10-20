import { Component, h } from 'preact'
import Layout from 'js/views/layout'
import BookList from 'js/components/book-list';
import * as s from 'css/home.scss'
import { BookData } from 'js/components/book';
import { query } from 'js/graphql';

const ListTypes = { series: "String" }
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

    componentDidMount() {
        query(ListQuery, ListTypes, {
            series: this.props.matches.name,
        }).then(books => {
            let book = books.results[0]
            if (book !== undefined) {
                this.setState({ current: book })
            }
        })
    }

    render() {
        let currentBook = null;
        if (this.state.current !== undefined) {
            currentBook = <BookList books={[this.state.current]} />
        }
        return <Layout backLink="/series">
            <h1>{this.props.matches.name}</h1>
            {currentBook}
            <BookList series={this.props.matches.name} />
        </Layout >
    }

}