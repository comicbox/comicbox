import { Component, h } from 'preact'
import * as s from 'css/book.scss'
import Book, { BookData } from 'js/components/book';
import { query } from 'js/graphql';

const BookListTypes = { take: "Int!", skip: "Int", series: "String" }
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

    componentDidMount() {
        if (!this.props.books) {
            query(BookListQuery, BookListTypes, {
                series: this.props.series,
                take: 15,
                skip: 0,
            }).then(books => {
                const skip = books.page_info.skip
                const take = books.page_info.take
                const total = books.page_info.total

                let newBooks: BookData[] = []

                for (let i = 0; i < total; i++) {
                    if (i >= skip && i < skip + take) {
                        let book = books.results[i + skip]
                        book.link = `/book/${book.id}`
                        newBooks[i] = book
                    } else {
                        newBooks[i] = null
                    }
                }
                this.setState({
                    books: newBooks
                })
            })
        }

    }

    bookIntersection(element: IntersectionObserverEntry, index: number, book: BookData) {
        if (element.intersectionRatio > 0 && book === null) {
            query(BookListQuery, BookListTypes, {
                series: this.props.series,
                take: 1,
                skip: index,
            }).then(books => {
                let newBooks = this.state.books;
                newBooks[books.page_info.skip] = books.results[0]
                this.setState({ books: newBooks })
            })
        }
    }

    render() {
        let books: BookData[] = this.props.books || this.state.books || [];

        return <div className={s.bookList} >
            {books.map((book, i) => <Book data={book} onIntersection={element => {
                this.bookIntersection(element, i, book)
            }} />)}
        </div>
    }

}