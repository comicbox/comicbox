import { Component, h } from 'preact'
import Layout from 'js/views/layout'
import * as graphql from 'js/graphql'

import * as s from 'css/book.scss'
import Book, { BookData } from 'js/components/book';

interface Props {

}

interface State {
    series: BookData[]
}

export default class SeriesList extends Component<Props, State> {

    componentDidMount() {
        graphql.Exec(`query {
            series(take: 100) {
              page_info {
                total
              }
              results {
                name
                books(take: 1) {
                  pages(type: COVER) {
                    url
                  }
                }
              }
            }
          }`).then(response => this.setState({
                series: response.data.series.results.map((serie: any): BookData => {
                    return {
                        series: serie.name,
                        pages: serie.books[0].pages,
                        link: `/series/${serie.name}`,
                        volume: null,
                        chapter: null,
                        title: null,
                    }
                })
            }))
    }

    render() {
        console.log(this.state.series);
        let series: BookData[] = this.state.series || [];
        return <div className={s.bookList} >
            {series.map(book => <Book data={book} />)}
        </div>
    }

}