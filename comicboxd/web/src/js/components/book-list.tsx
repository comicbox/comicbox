import { Component, h } from 'preact'
import Layout from 'js/views/layout'
import * as graphql from 'js/graphql'

import * as s from 'css/book.scss'
import Book, { BookData } from 'js/components/book';

interface Props {

}

interface State {
    books: BookData[]
}

export default class BookList extends Component<Props, State> {

    componentDidMount() {
        graphql.Exec(`query {
            books(take: 100) {
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
          }`).then(response => this.setState({
                books: response.data.books.results.map((book: any): BookData => {
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