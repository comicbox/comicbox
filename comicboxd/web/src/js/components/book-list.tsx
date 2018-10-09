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
  }
}
`

interface Props {
    series: string
}

interface State {
    books: BookData[]
}

export default class BookList extends Component<Props, State> {

    componentDidMount() {
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

    render() {
        let image = "https://comicbox.ca/book/01e91cb5-e8be-4463-bd5d-42a2e6271a59/page/0";
        let books: BookData[] = this.state.books || [];
        return <div className={s.bookList} >
            {books.map(book => <Book data={book} />)}
        </div>
    }

}