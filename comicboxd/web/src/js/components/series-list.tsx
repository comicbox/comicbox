import { Component, h } from 'preact'
import * as s from 'css/book.scss'
import Book, { BookData } from 'js/components/book';
import { query } from 'js/graphql';

const SeriesListTypes = { list: "List" }
const SeriesListQuery = `
series(take: 100 list: $list) {
  page_info {
    total
  }
  results {
    name
    books(take: 1) {
      cover {
        url
      }
    }
  }
}
`

interface Props {
    list?: "READING" | "COMPLETED" | "PAUSED" | "DROPPED" | "PLANNING"
}

interface State {
    series: BookData[]
}

export default class SeriesList extends Component<Props, State> {

    componentDidMount() {
        query(SeriesListQuery, SeriesListTypes, this.props).then(series => this.setState({
            series: series.results.map((serie: any): BookData => {
                return {
                    series: serie.name,
                    cover: serie.books[0].cover,
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