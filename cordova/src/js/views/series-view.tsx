import * as s from 'css/home.scss'
import ModelList from 'js/components/model-list'
import { gql } from 'js/graphql'
import Book from 'js/model/book'
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
    current: Book
}

export default class SeriesView extends Component<Props, State> {

    public async componentDidMount() {
        const books = Book.where('series', this.props.matches.name).where('read', false).take(1).get()

        for await (const book of books) {
            if (this.state.current === undefined || !this.state.current.fresh) {
                this.setState({ current: book })
            }
        }
    }

    public render() {
        let currentBook = null
        if (this.state.current !== undefined) {
            currentBook = <ModelList items={[this.state.current]} />
        }
        return <Layout backLink='/series'>
            <h1>{this.props.matches.name}</h1>
            {currentBook}
            <ModelList items={Book.where('series', this.props.matches.name).take(100).get()} />
        </Layout >
    }

}
