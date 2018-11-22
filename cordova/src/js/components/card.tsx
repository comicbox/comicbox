import autobind from 'autobind-decorator'
import * as s from 'css/book.scss'
import LazyImg from 'js/components/lazy-img'
import Book from 'js/model/book'
import { Model } from 'js/model/model'
import { QueryBuilder } from 'js/model/query-builder'
import Series from 'js/model/series'
import map from 'lodash/map'
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
    options?: Dictionary<(model: T) => void>
    loadQuery?: QueryBuilder<T>
}
interface State<T extends Model> {
    data: T
}

export default class Card<T extends Model> extends Component<Props<T>, State<T>> {

    private menu: Menu
    private observer: IntersectionObserver

    public componentDidMount() {
        if (this.props.loadQuery) {
            const options = {
                root: null as HTMLElement,
                rootMargin: '0px',
                threshold: 0.1,
            }
            this.observer = new IntersectionObserver(elements => {
                for (const element of elements) {
                    if (element.isIntersecting) {
                        if (!this.props.data && !this.state.data) {
                            this.props.loadQuery.first().then(model => {
                                this.setState({ data: model })
                                this.observer.disconnect()
                            })
                        }
                    }
                }
            }, options)
            this.observer.observe(this.base)
        }
    }

    public componentWillUnmount() {
        if (this.observer) {
            this.observer.disconnect()
        }
    }

    public render() {
        const model = this.state.data || this.props.data
        let image = ''
        let series = ''
        let title = ''
        let readMark = null
        let options: Dictionary<(model: any) => void> = {}

        if (!model) {
            return <Elevation z={2} className={s.book} />
        }

        if (model instanceof Book) {
            image = model.cover.url + '?height=200&quality=30'

            series = model.series

            if (model.volume !== null) {
                title += `V${model.volume}`
            }
            if (model.chapter !== null) {
                if (title !== '') {
                    title += ' '
                }
                title += `#${model.chapter}`
            }
            if (model.title !== null && model.title !== '') {
                if (title !== '') {
                    title += ' - '
                }
                title += model.title
            }

            if (model.read === false) {
                readMark = <div class={s.unread}>
                    <svg viewBox='0 0 40 40'>
                        <polygon points='0 0,40 0,40,40' />
                    </svg>
                </div>
            }

            options = bookOptions
        } else if (model instanceof Series) {

            image = model.books[0].cover.url + '?height=200&quality=30'

            series = model.name
            if (model.read !== model.total) {
                readMark = <div class={s.unread}>
                    <svg viewBox='0 0 40 40'>
                        <rect width='300' height='40' />
                        <text x='50%' y='50%' alignment-baseline='middle' text-anchor='middle'>
                            {model.total - model.read}
                        </text>
                    </svg>
                </div>
            }
            options = seriesOptions
        }

        return <Elevation z={2} className={s.book}>
            <Link href={model.link}>
                {readMark}
                <LazyImg className={s.cover} src={image} key={image} />
                <div className={s.series} title={series}>{series || '\u00A0'}</div>

                <div className={s.title} title={title}>{title}</div>
            </Link>

            <Menu.Anchor class={s.menu}>
                <Button class={s.button} onClick={this.openMenu}>
                    <Icon>more_vert</Icon>
                </Button>
                <Menu ref={menu => this.menu = menu} class={s.options}>
                    {map(this.props.options || options, (func, name) => (
                        <Menu.Item onClick={func.bind(this, model)} key={name}>{name}</Menu.Item>
                    ))}

                </Menu>
            </Menu.Anchor>
        </Elevation>

    }

    @autobind
    private openMenu(e: Event) {
        this.menu.MDComponent.open = true
    }

}

const seriesOptions: Dictionary<(model: Series) => void> = {
    'Add to Reading': series => {
        series.list = 'READING'
        series.save()
    },
    'Add to Paused': series => {
        series.list = 'PAUSED'
        series.save()
    },
    'Add to Complected': series => {
        series.list = 'COMPLETED'
        series.save()
    },
    'Add to Dropped': series => {
        series.list = 'DROPPED'
        series.save()
    },
    'Add to Planning': series => {
        series.list = 'PLANNING'
        series.save()
    },
}

const bookOptions: Dictionary<(model: Book) => void> = {
    'Mark as read': book => {
        book.current_page = book.pages.length
        book.save()
    },
    'Mark as unread': book => {
        book.current_page = 0
        book.save()
    },
}
