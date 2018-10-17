import { Component, h } from 'preact'
import Layout from 'js/views/layout'
import BookList from 'js/components/book-list';
import * as s from 'css/home.scss'
import Book from 'js/components/book';
import { query } from 'js/graphql';

const Types = { series: "String" }
const Query = `
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
  }
}
`

interface Props {
    matches?: { [name: string]: string }
}

interface State {

}

export default class SeriesView extends Component<Props, State> {

    componentDidMount() {
        query(Query, Types, {
            series: this.props.matches.name,
        }).then(books => {
            console.log(books.result)
        })
    }

    render() {

        return <Layout backLink="/series">
            <h1>{this.props.matches.name}</h1>

            <BookList series={this.props.matches.name} />
        </Layout >
    }

}