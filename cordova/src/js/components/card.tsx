import autobind from 'autobind-decorator'
import * as s from 'css/book.scss'
import LazyImg from 'js/components/lazy-img'
import Book from 'js/model/book'
import { Model } from 'js/model/model'
import Series from 'js/model/series'
import { Component, h } from 'preact'
import Button from 'preact-material-components/Button'
import Elevation from 'preact-material-components/Elevation'
import Icon from 'preact-material-components/Icon'
import Menu from 'preact-material-components/Menu'
import { Link } from 'preact-router'

export interface PageData {
    url: string
}

interface Props<T extends Model> {
    data: T
    // onIntersection?: (element: IntersectionObserverEntry) => void
}

export default class Card<T extends Model> extends Component<Props<T>, null> {

    private menu: Menu

    public render() {
        const data = this.props.data
        let image = ''
        let series = ''
        let title = ''
        let readMark = null

        if (data === null) {
            return <Elevation z={2} className={s.book} />
        }

        if (data instanceof Book) {
            const book = data as Book
            image = book.cover.url + '?height=200&quality=30'

            series = book.series

            if (book.volume !== null) {
                title += `V${book.volume}`
            }
            if (book.chapter !== null) {
                if (title !== '') {
                    title += ' '
                }
                title += `#${book.chapter}`
            }
            if (book.title !== null && book.title !== '') {
                if (title !== '') {
                    title += ' - '
                }
                title += book.title
            }

            if (book.read === false) {
                readMark = <div class={s.unread}>
                    <svg viewBox='0 0 40 40'>
                        <polygon points='0 0,40 0,40,40' />
                    </svg>
                </div>
            }
        } else if (data instanceof Series) {
            const serie = data as Series

            image = serie.books[0].cover.url + '?height=200&quality=30'

            series = serie.name
            if (serie.read !== serie.total) {
                readMark = <div class={s.unread}>
                    <svg viewBox='0 0 40 40'>
                        <rect width='300' height='40' />
                        <text x='50%' y='50%' alignment-baseline='middle' text-anchor='middle'>
                            {serie.total - serie.read}
                        </text>
                    </svg>
                </div>
            }
        }

        return <Elevation z={2} className={s.book}>
            <Link href={data.link}>
                {readMark}
                <LazyImg className={s.cover} src={image} />
                <div className={s.series} title={series}>{series || '\u00A0'}</div>

                <div className={s.title} title={title}>{title}</div>
            </Link>
            <Menu.Anchor>
                <Button onClick={this.openMenu} >
                    <Icon>more_vert</Icon>
                </Button>
                <Menu ref={menu => this.menu = menu} >
                    <Menu.Item>Hello1</Menu.Item>
                    <Menu.Item>Hello2</Menu.Item>
                    <Menu.Item>Hello3</Menu.Item>
                </Menu>
            </Menu.Anchor>
        </Elevation>

    }

    @autobind
    private openMenu(e: Event) {
        this.menu.MDComponent.open = true
    }

}
