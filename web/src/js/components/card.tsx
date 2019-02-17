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
import { Link, route } from 'preact-router'

export interface PageData {
    url: string
}

type Option<T extends Model> = ((model: T) => void | Promise<void>) | 'divider'
interface Options<T extends Model> {
    [name: string]: Option<T>
}

interface Props<T extends Model> {
    data: T | null
    options?: Options<T>
    loadQuery?: QueryBuilder<T>
}
interface State<T extends Model> {
    data: T | null
}

export default class Card<T extends Model> extends Component<Props<T>, State<T>> {

    private menu: Menu
    private observer: IntersectionObserver

    public componentDidMount() {
        if (this.props.loadQuery) {
            const options = {
                root: null as any as HTMLElement,
                rootMargin: '0px',
                threshold: 0.1,
            }
            this.observer = new IntersectionObserver(elements => {
                for (const element of elements) {
                    if (element.isIntersecting) {
                        if (!this.props.data && !this.state.data && this.props.loadQuery) {
                            this.props.loadQuery.first().then(model => {
                                this.setState({ data: model })
                                this.observer.disconnect()
                            })
                        }
                    }
                }
            }, options)
            if (this.base) {
                this.observer.observe(this.base)
            }
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
        let options: Options<T> = {}

        if (!model) {
            return <Elevation z={2} className={s.book} />
        }

        if (model instanceof Book) {
            if (model.cover) {
                image = model.cover.url + '?height=200'
            }

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

            options = bookOptions as Options<T>
        } else if (model instanceof Series) {
            if (model.books && model.books[0] && model.books[0].cover) {
                image = model.books[0].cover.url + '?height=200'
            }

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
            options = seriesOptions as Options<T>
        }

        return <Elevation z={2} className={s.book}>
            <Link href={model.link}>
                {readMark}
                <LazyImg className={s.cover} src={image} key={image} />
                <div className={s.series} title={series}>{series || '\u00A0'}</div>

                <div className={s.title} title={title}>{title}</div>
            </Link>
            {this.buildMenu(this.props.options || options, model)}

        </Elevation>

    }

    @autobind
    private openMenu(e: Event) {
        if (this.menu.MDComponent) {
            this.menu.MDComponent.open = true
        }
    }
    private buildMenu(ops: Options<T>, model: T): JSX.Element {
        return <Menu.Anchor class={s.menu}>
            <Button class={s.button} onClick={this.openMenu}>
                <Icon>more_vert</Icon>
            </Button>
            <Menu ref={menu => this.menu = menu} class={s.options}>
                {map(ops, (func, name) => {
                    if (func === 'divider') {
                        return <li class='mdc-list-divider' role='separator' />
                    } else if (typeof func === 'function') {
                        return <Menu.Item onClick={this.btnMenuItem(func, model)} key={name}>{name}</Menu.Item>
                    }
                })}

            </Menu>
        </Menu.Anchor>
    }

    @autobind
    private btnMenuItem(func: Option<T>, model: T) {
        return async () => {
            if (func === 'divider') {
                return
            }
            const done = func.call(this, model)
            if ('then' in done) {
                await done
            }
            this.setState({ data: model })
        }
    }
}

const seriesOptions: Options<Series> = {
    'Remove from list': async series => {
        series.list = 'NONE'
        await series.save()
    },
    'Add to reading': async series => {
        series.list = 'READING'
        await series.save()
    },
    'Add to paused': async series => {
        series.list = 'PAUSED'
        await series.save()
    },
    'Add to complected': async  series => {
        series.list = 'COMPLETED'
        await series.save()
    },
    'Add to dropped': async  series => {
        series.list = 'DROPPED'
        await series.save()
    },
    'Add to planning': async series => {
        series.list = 'PLANNING'
        await series.save()
    },
    'd1': 'divider',
    'Edit': async series => {
        await series.openEditModal()
    },
    'Mark all as read': async series => {
        await series.updateAllBooks({
            // without making something just for this I don't know of a better way to mark all the books as read
            current_page: 10000,
        })
    },
    'Mark all as unread': async series => {
        await series.updateAllBooks({
            current_page: 0,
        })
    },
}

const bookOptions: Options<Book> = {
    'Mark as read': async book => {
        book.current_page = book.pages.length
        await book.save()
    },
    'Mark as unread': async book => {
        book.current_page = 0
        await book.save()
    },
    'd1': 'divider',
    'Go to series': book => {
        route(`/series/${book.series}`)
    },
    'd2': 'divider',
    'Edit Book': async book => {
        await book.openEditModal()
    },
}
