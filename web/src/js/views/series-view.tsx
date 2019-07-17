import autobind from 'autobind-decorator'
import * as s from 'css/series-view.scss'
import { OpenYesNo } from 'js/components/modal'
import ModelList from 'js/components/model-list'
import Parallax from 'js/components/parallax'
import { gql } from 'js/graphql'
import Book from 'js/model/book'
import Series from 'js/model/series'
import route from 'js/routes'
import Layout from 'js/views/layout'
import { Component, h } from 'preact'
import Button from 'preact-material-components/Button'
import Fab from 'preact-material-components/Fab'
import Icon from 'preact-material-components/Icon'
import { Link } from 'preact-router'

interface Props {
    matches?: {
        name: string,
    }
}

interface State {
    current: Book
    first: Book
    series: Series
}

export default class SeriesView extends Component<Props, State> {

    constructor(props: Props) {
        super(props)
        this.seriesChange()
    }
    public async componentDidUpdate(prevProps: Props) {
        if (this.props.matches!.name !== prevProps.matches!.name) {
            this.seriesChange()
        }
    }

    public render() {
        const series = this.props.matches!.name

        let backgroundImg = ''
        let readLink = ''
        let thumbImg = ''
        let summary = ''
        let title = ''
        let tags: JSX.Element[] | null = null
        let rating: number = 0

        if (this.state.series) {
            const serie = this.state.series
            tags = serie.tags.map(tag => <Link href={`/tag/${tag}`} key={tag}>#{tag} </Link>)
        }
        if (this.state.first) {
            const first = this.state.first
            backgroundImg = first.cover.url
        }
        if (this.state.current || this.state.first) {
            const current = this.state.current || this.state.first
            thumbImg = current.cover.url
            readLink = current.link.url
            summary = current.summary
            if (current.volume) {
                title += `V${current.volume} `
            }
            if (current.chapter) {
                title += `#${current.chapter} `
            }
            if (current.title) {
                if (title !== '') {
                    title += ' - '
                }
                title += current.title
            }

            rating = (current.rating || current.community_rating) / 2
        }

        return <Layout
            back={route('series.index')}
            clearTopBar
            breadcrumbs={[
                {
                    name: 'Series',
                    route: route('series.index'),
                },
            ]}
        >
            {/* <div class={s.background} style={{ backgroundImage: `url(${backgroundImg})` }} /> */}
            <Parallax class={s.parallax} src={backgroundImg} />
            <div class={s.header}>
                <img src={thumbImg} alt='cover' class={s.cover + ' mdc-elevation--z4'} />
                <Link class={s.readFab} href={readLink}>
                    {/* <Fab><Fab.Icon>play_arrow</Fab.Icon></Fab> */}
                    <Fab><Fab.Icon>book</Fab.Icon></Fab>
                </Link>
                {/* <div class={s.rating}><Stars rating={rating} /></div> */}
                <div class={s.tags}>{tags}</div>
                <div class={s.series}>{series}</div>
                <div class={s.title}>{title}</div>
                <div class={s.summary}>{summary}</div>
                <div class={s.buttons}>
                    <Button onClick={this.btnDownload}>
                        <Icon>file_download</Icon>
                    </Button>
                    <Button onClick={this.btnRead}>
                        <Icon>visibility</Icon>
                    </Button>
                    <Button onClick={this.btnUnread}>
                        <Icon>visibility_off</Icon>
                    </Button>

                    <Button onClick={this.btnEdit}>
                        <Icon>edit</Icon>
                    </Button>
                </div>

            </div>
            <ModelList
                items={Book.where('series', series)}
                key={series + 'books'}
            />
        </Layout >
    }

    @autobind
    private async btnRead() {
        const series = this.state.series
        if (!await OpenYesNo(`This will mark all books in ${series.name} as read, are you sure you want to do this?`)) {
            return
        }
        series.updateAllBooks({
            // without making something just for this I don't know of a better way to mark all the books as read
            current_page: 10000,
        })
    }

    @autobind
    private async btnUnread() {
        const series = this.state.series
        if (!await OpenYesNo(`This will mark all books in ${series.name}
            as unread, are you sure you want to do this?`)) {
            return
        }
        series.updateAllBooks({
            current_page: 0,
        })
    }

    @autobind
    private btnDownload() {
        alert('Downloading is not yet implemented')
    }

    @autobind
    private async btnEdit() {
        const series = this.state.series
        await series.openEditModal()
        this.setState({ series: series })
    }

    private async seriesChange() {
        const series = this.props.matches!.name

        const [serie, current, first] = await Promise.all([

            Series.where('name', series)
                .select('name', 'list', 'tags')
                .first(),

            Book.where('series', series)
                .where('read', false)
                .select('id', 'series', 'cover', 'chapter', 'volume', 'title', 'summary', 'rating', 'community_rating')
                .first(),

            Book.where('series', series)
                .select('series', 'cover', 'chapter', 'volume', 'title', 'summary')
                .first(),
        ])
        this.setState({
            series: serie,
            current: current,
            first: first,
        })
    }

}
