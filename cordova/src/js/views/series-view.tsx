import autobind from 'autobind-decorator'
import * as s from 'css/series-view.scss'
import Modal, { OpenModal, OpenYesNo } from 'js/components/modal'
import ModelList from 'js/components/model-list'
import Parallax from 'js/components/parallax'
import Stars from 'js/components/stars'
import { gql } from 'js/graphql'
import Book from 'js/model/book'
import Series, { List } from 'js/model/series'
import Layout from 'js/views/layout'
import { Component, h } from 'preact'
import Button from 'preact-material-components/Button'
import Fab from 'preact-material-components/Fab'
import Icon from 'preact-material-components/Icon'
import Menu from 'preact-material-components/Menu'
import { Link } from 'preact-router'
import TextField from 'preact-material-components/TextField';

interface Props {
    matches?: { [name: string]: string }
}

interface State {
    current: Book
    first: Book
    series: Series
}

export default class SeriesView extends Component<Props, State> {

    private listMenu: Menu

    public async componentDidMount() {
        const series = this.props.matches.name

        Series.where('name', series)
            .select('name', 'list')
            .first()
            .then(serie => this.setState({ series: serie }))

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
        let rating: number = 0

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

            rating = (current.rating || current.community_rating) / 2
        }

        return <Layout backLink='/series' clearTopBar>
            {/* <div class={s.background} style={{ backgroundImage: `url(${backgroundImg})` }} /> */}
            <Parallax class={s.parallax} src={backgroundImg} />
            <div class={s.header}>
                <img src={thumbImg} alt='cover' class={s.cover + ' mdc-elevation--z4'} />
                <Link class={s.readFab} href={readLink}>
                    {/* <Fab><Fab.Icon>play_arrow</Fab.Icon></Fab> */}
                    <Fab><Fab.Icon>book</Fab.Icon></Fab>
                </Link>
                <div class={s.rating}><Stars rating={rating}/></div>
                <div class={s.series}>{series}</div>
                <div class={s.title}>{title}</div>
                <div class={s.summary}>{summary}</div>
                <div class={s.buttons}>
                    {/* <Button onClick={this.btnRead}>
                        <Icon>visibility</Icon>
                    </Button> */}
                    <Button onClick={this.btnDownload}>
                        <Icon>file_download</Icon>
                    </Button>

                    <Menu.Anchor class={s.menu}>
                        <Button onClick={this.openMenu}>
                            <Icon>view_list</Icon>
                        </Button>
                        <Menu ref={menu => this.listMenu = menu} >
                            <Menu.Item onClick={this.btnListReading}>Reading</Menu.Item>
                            <Menu.Item onClick={this.btnListCompleted}>Completed</Menu.Item>
                            <Menu.Item onClick={this.btnListDropped}>Dropped</Menu.Item>
                            <Menu.Item onClick={this.btnListPaused}>Paused</Menu.Item>
                            <Menu.Item onClick={this.btnListPlanning}>Planning</Menu.Item>
                        </Menu>
                    </Menu.Anchor>

                    <Button onClick={this.btnEdit}>
                        <Icon>edit</Icon>
                    </Button>
                </div>

            </div>
            <ModelList
                class={s.books}
                items={Book.where('series', series)}
                key={series + 'books'}
            />
        </Layout >
    }

    @autobind
    private openMenu(e: Event) {
        this.listMenu.MDComponent.open = true
    }

    @autobind
    private btnRead() {
        const series = this.state.series

        alert(`This will mark all books in ${series.name} as read`)
    }

    @autobind
    private btnDownload() {
        alert('Downloading is not yet implemented')
    }

    @autobind
    private setList(list: List) {
        const series = this.state.series
        series.list = list
        series.save()
    }

    @autobind
    private btnListReading() {
        this.setList('READING')
    }

    @autobind
    private btnListCompleted() {
        this.setList('COMPLETED')
    }

    @autobind
    private btnListDropped() {
        this.setList('DROPPED')
    }

    @autobind
    private btnListPaused() {
        this.setList('PAUSED')
    }

    @autobind
    private btnListPlanning() {
        this.setList('PLANNING')
    }

    @autobind
    private btnEdit() {
        const series = this.state.series

        OpenModal(<Modal.Surface>
            <Modal.Title>
                Edit {series.name}
            </Modal.Title>
            <Modal.Body>
                <TextField label='name'/>
                <TextField label='name'/>
                <TextField label='name'/>
            </Modal.Body>
            <Modal.Actions>
                <Modal.Button action='close'>Close</Modal.Button>
                <Modal.Button action='accept'>Save</Modal.Button>
            </Modal.Actions>
        </Modal.Surface>)

    }

}
