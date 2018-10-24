import * as s from 'css/book.scss'
import Card from 'js/components/card'
import Book from 'js/model/book'
import { Model } from 'js/model/model'
import Series from 'js/model/series'
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

interface Props<T extends Model> {
    items: AsyncIterableIterator<T> | T[]
}

interface State<T extends Model> {
    items: T[]
}
export default class ModelList<T extends Model> extends Component<Props<T>, State<T>> {

    public async componentDidMount() {
        if (Array.isArray(this.props.items)) {
            this.setState({ items: this.props.items })
        } else {
            const books: T[] = []
            for await (const book of this.props.items) {
                let found = false
                for (let i = 0; i < books.length; i++) {
                    if (books[i].id === book.id && !books[i].fresh && book.fresh) {
                        books[i] = book
                        found = true

                        this.setState({ items: books })
                        break
                    }
                }
                if (!found) {
                    books.push(book)
                    this.setState({ items: books })
                }
            }
        }
    }

    public render() {
        const items: T[] = this.state.items || []

        return (<div className={s.bookList} >
            {items.map((item, i) => (
                <Card key={i} data={item} />
            ))}
        </div>)
    }

    // onIntersection={e => this.bookIntersection(e, i, book)}
    // private bookIntersection(element: IntersectionObserverEntry, index: number, book: BookData) {
    //     if (element.intersectionRatio > 0 && book === null) {
    //         gql(BookListQuery, BookListTypes, {
    //             series: this.props.series,
    //             take: 1,
    //             skip: index,
    //         }).then(books => {
    //             const newBooks = this.state.books
    //             const b = books.results[0]
    //             b.link = `/book/${b.id}`
    //             newBooks[books.page_info.skip] = b
    //             this.setState({ books: newBooks })
    //         })
    //     }
    // }
}
function sortSeries(a: Series, b: Series): number {
    return a.name.localeCompare(b.name)
}

function sortBooks(a: Book, b: Book): number {
    if (a.series !== b.series) {
        return a.series.localeCompare(b.series)
    }
    if (a.volume !== b.volume) {
        return (a.volume || Number.MAX_SAFE_INTEGER) - (b.volume || Number.MAX_SAFE_INTEGER)
    }
    return a.chapter - b.chapter
}
