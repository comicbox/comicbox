import * as s from 'css/book.scss'
import Book, { BookData } from 'js/components/book'
import { gql } from 'js/graphql'
import { Component, h } from 'preact'

const SeriesListTypes = { list: 'List' }
const SeriesListQuery = `
series(take: 100 list: $list name_ne: "") {
  page_info {
    total
  }
  results {
    name
    read
    total
    books(take: 1) {
      cover {
        url
      }
    }
  }
}
`

interface Props {
    list?: 'READING' | 'COMPLETED' | 'PAUSED' | 'DROPPED' | 'PLANNING'
}

interface State {
    series: BookData[]
}

export default class SeriesList extends Component<Props, State> {

    public componentDidMount() {
        gql(SeriesListQuery, SeriesListTypes, this.props).then(series => this.setState({
            series: series.results.map((serie: any): BookData => {
                return {
                    id: series.name,
                    series: serie.name,
                    cover: serie.books[0].cover,
                    link: `/series/${serie.name}`,
                    volume: null,
                    chapter: null,
                    title: null,
                    read: serie.total - serie.read,
                }
            }),
        }))
    }

    public render() {
        const series: BookData[] = this.state.series || []
        return <div className={s.bookList} >
            {series.map(book => <Book key={book.id} data={book} />)}
        </div>
    }

}
