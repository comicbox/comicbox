import * as s from 'css/book.scss'
import Book, { BookData } from 'js/components/book'
import { query } from 'js/graphql'
import { Component, h } from 'preact'

const BookListTypes = { take: 'Int!', skip: 'Int', series: 'String' }
const BookListQuery = `
books(take: $take skip: $skip series: $series) {
  page_info {
    total
    take
    skip
  }
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
    series?: string
    books?: BookData[]
}

interface State {
    books: BookData[]
}

export default class BookList extends Component<Props, State> {

    public componentDidMount() {
        if (!this.props.books) {
            query(BookListQuery, BookListTypes, {
                series: this.props.series,
                take: 15,
                skip: 0,
            }).then(books => {
                const skip = books.page_info.skip
                const take = books.page_info.take
                const total = books.page_info.total

                const newBooks: BookData[] = []

                for (let i = 0; i < total; i++) {
                    if (i >= skip && i < skip + take) {
                        const book = books.results[i + skip]
                        book.link = `/book/${book.id}`
                        newBooks[i] = book
                    } else {
                        newBooks[i] = null
                    }
                }
                this.setState({
                    books: newBooks,
                })
            })
        }

    }

    public render() {
        const books: BookData[] = this.props.books || this.state.books || []

        return (<div className={s.bookList} >
            {books.map((book, i) => (
                <Book key={i} data={book} onIntersection={e => this.bookIntersection(e, i, book)} />
            ))}
        </div>)
    }

    private bookIntersection(element: IntersectionObserverEntry, index: number, book: BookData) {
        if (element.intersectionRatio > 0 && book === null) {
            query(BookListQuery, BookListTypes, {
                series: this.props.series,
                take: 1,
                skip: index,
            }).then(books => {
                const newBooks = this.state.books
                const b = books.results[0]
                b.link = `/book/${b.id}`
                newBooks[books.page_info.skip] = b
                this.setState({ books: newBooks })
            })
        }
    }
}
