import { Component, h } from 'preact'
import Elevation from 'preact-material-components/Elevation'
import { Link } from 'preact-router'

import * as s from 'css/book.scss'
import 'preact-material-components/Elevation/style.css'

export interface PageData {
    url: string
}
export interface BookData {
    series: string
    cover: PageData
    volume: number
    chapter: number
    title: string
    link: string
}

interface Props {
    data: BookData
}

interface State {
}

export default class Book extends Component<Props, State> {

    componentDidMount() {
    }

    render() {
        let book = this.props.data
        let image = ""
        let title = ""

        if (book.cover) {
            image = book.cover.url + "?height=200"
        } else {
            image = "https://mangadex.org/images/manga/7139.jpg?1536006542";
        }

        if (book.volume !== null) {
            title += `V${book.volume}`
        }
        if (book.chapter !== null) {
            if (title !== "") {
                title += " "
            }
            title += `#${book.chapter}`
        }
        if (book.title !== null && book.title !== "") {
            if (title !== "") {
                title += " - "
            }
            title += book.title
        }

        return <Elevation z={2} className={s.book}>
            <Link href={book.link}>
                <div className={s.cover} style={{ backgroundImage: `url(${image})` }}></div>
                <div className={s.series} title={book.series}>{book.series}</div>
                <div className={s.title} title={title}>{title}</div>
            </Link>
        </Elevation>

    }

}