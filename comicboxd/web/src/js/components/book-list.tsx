import { Component, h } from 'preact'
import * as s from 'css/book.scss'
import Book, { BookData } from 'js/components/book';
import { query } from 'js/graphql';

const BookListTypes = { take: "Int!", skip: "Int", series: "String" }
const BookListQuery = `
books(take: $take skip: $skip series: $series) {
  page_info {
    total
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
    page: number
}

interface State {
    books: BookData[]
}

export default class BookList extends Component<Props, State> {

    componentDidMount() {
        query(BookListQuery, BookListTypes, {
            series: this.props.series,
            take: 15,
            skip: this.props.page * 15
        }).then(books => this.setState({
            books: books.results.map((book: any): BookData => {
                book.link = `/book/${book.id}`
                return book
            })
        }))
    }

    render() {
        console.log(this.state.books);
        let image = "https://comicbox.ca/book/01e91cb5-e8be-4463-bd5d-42a2e6271a59/page/0";
        let books: BookData[] = this.state.books || [];
        return <div className={s.bookList} >
            {books.map(book => <Book data={book} />)}
        </div>
    }

}