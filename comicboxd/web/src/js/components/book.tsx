import { Component, h } from 'preact'
import Elevation from 'preact-material-components/Elevation'
import { Link } from 'preact-router'

import * as s from 'css/book.scss'
import 'preact-material-components/Elevation/style.css'
import { query } from 'js/graphql'

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
    read: boolean | number
}

interface Props {
    data: BookData
    onIntersection?: (element: IntersectionObserverEntry) => void
}

interface State {
}

export default class Book extends Component<Props, State> {
    observer: IntersectionObserver


    componentDidMount() {
        let options = {
            root: null as HTMLElement,
            rootMargin: '0px',
            threshold: 0.1,
        }
        this.observer = new IntersectionObserver(elements => {
            for (let element of elements) {
                if (this.props.onIntersection) {
                    this.props.onIntersection(element)
                }
            }
        }, options)
        this.observer.observe(this.base)
    }

    componentWillUnmount() {
        if (this.observer) {
            this.observer.disconnect()
        }
    }

    render() {
        let book = this.props.data
        let image = ""
        let title = ""

        if (book === null) {
            return <Elevation z={2} className={s.book} />
        }

        if (book.cover) {
            image = book.cover.url + "?height=200&quality=30"
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

        let readMark = null
        if (!book.read) {
            readMark = <div class={s.unread}>
                <svg viewBox="0 0 100 100">
                    <polygon points="0 0,100 0,100,100" class="secondary-colour"></polygon>
                </svg>
            </div>
        }

        return <Elevation z={2} className={s.book}>
            <Link href={book.link}>
                {readMark}
                <img className={s.cover} src={image} />
                <div className={s.series} title={book.series}>{book.series || "\u00A0"}</div>
                <div className={s.title} title={title}>{title}</div>
            </Link>
        </Elevation>

    }

}