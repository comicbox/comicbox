import * as s from 'css/series-view.scss'
import ModelList from 'js/components/model-list'
import { gql } from 'js/graphql'
import Book from 'js/model/book'
import { ModelArray } from 'js/model/model'
import Layout from 'js/views/layout'
import { Component, h } from 'preact'
import Btn from 'preact-material-components/Button'
import Fab from 'preact-material-components/Fab'
import { Link } from 'preact-router';
import Icon from 'preact-material-components/Icon';

interface Props {
    matches?: { [name: string]: string }
}

interface State {
    current: Book
    first: Book
}

export default class SeriesView extends Component<Props, State> {

    public async componentDidMount() {
        const series = this.props.matches.name
        Book.where('series', series)
            .where('read', false)
            .select('id', 'series', 'cover', 'chapter', 'volume', 'title', 'summary', 'rating', 'community_rating')
            .first()
            .then(current => this.setState({ current: current }))

        Book.where('series', series)
            .select('series', 'cover', 'chapter', 'volume', 'title', 'summary')
            .first()
            .then(first => this.setState({ first: first }))

    }

    public render() {
        const series = this.props.matches.name

        let backgroundImg = ''
        let readLink = ''
        let thumbImg = ''
        let summary = ''
        let title = ''
        const stars: JSX.Element[] = []

        if (this.state.first) {
            const first = this.state.first
            backgroundImg = first.cover.url
        }
        if (this.state.current || this.state.first) {
            const current = this.state.current || this.state.first
            thumbImg = current.cover.url
            readLink = current.link
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

            const rating = current.rating || current.community_rating
            for (let i = 1; i <= 10; i += 2) {
                if (rating > i) {
                    stars.push(<Icon>star</Icon>)
                } else if (rating > i - 1) {
                    stars.push(<Icon>star_half</Icon>)
                } else {
                    stars.push(<Icon>star_border</Icon>)
                }

            }
        }

        return <Layout backLink='/series'>
            <div class={s.background} style={{ backgroundImage: `url(${backgroundImg})` }} />
            <div class={s.header}>
                <img src={thumbImg} alt='cover' class={s.cover + ' mdc-elevation--z4'} />
                <Link class={s.readFab} href={readLink}>
                    <Fab><Fab.Icon>play_arrow</Fab.Icon></Fab>
                </Link>
                <div class={s.rating}>{stars}</div>
                <div class={s.series}>{series}</div>
                <div class={s.title}>{title}</div>
                <div class={s.summary}>{summary}</div>

            </div>
            <ModelList
                class={s.books}
                items={Book.where('series', series)}
                key={series + 'books'}
            />
        </Layout >
    }

}
