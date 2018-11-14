import * as s from 'css/book.scss'
import Card from 'js/components/card'
import { Model, modelSort } from 'js/model/model'
import { Component, h } from 'preact'

interface Props<T extends Model> {
    items: AsyncIterableIterator<T> | T[]
}

interface State<T extends Model> {
    items: T[]
}
export default class ModelList<T extends Model> extends Component<Props<T>, State<T>> {

    public async componentDidMount() {        
        this.setState({ items: [] })
        if (Array.isArray(this.props.items)) {
            this.setState({ items: this.props.items })
        } else {
            const items: T[] = []
            for await (const book of this.props.items) {
                let found = false
                for (let i = 0; i < items.length; i++) {
                    if (items[i].id === book.id && !items[i].fresh && book.fresh) {
                        items[i] = book
                        found = true

                        this.setState({ items: items })
                        break
                    }
                }
                if (!found) {
                    items.push(book)
                    this.setState({ items: items })
                }
            }
        }
    }

    public render() {
        const items: T[] = this.state.items || []

        return (<div className={s.bookList} >
            {items.sort(modelSort).map((item, i) => (
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
