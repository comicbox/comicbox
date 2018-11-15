import autobind from 'autobind-decorator'
import * as s from 'css/layout.scss'
import { historyPop, historyPrevious } from 'js/history'
import { Component, h } from 'preact'
import Icon from 'preact-material-components/Icon'
import TopAppBar from 'preact-material-components/TopAppBar'
import 'preact-material-components/TopAppBar/style.css'
import { Link, route } from 'preact-router'

interface Props {
    backLink: string
}

interface State {
    drawerOpened: boolean
}

export default class Layout extends Component<Props, State> {

    private searchInput: HTMLInputElement

    private get menu() {
        return [
            {
                name: 'Home',
                icon: 'home',
                href: '/',
            },
            {
                name: 'Lists',
                icon: 'view_list',
                href: '/list',
            },
            {
                name: 'Series',
                icon: 'collections_bookmark',
                href: '/series',
            },
            {
                name: 'Something',
                icon: 'help',
                href: '/something',
            },
            {
                name: 'Settings',
                icon: 'settings',
                href: '/settings',
            },
        ]
    }

    constructor() {
        super()
        this.state = {
            drawerOpened: false,
        }
    }

    public render() {
        let backButton = <TopAppBar.Icon />
        // <TopAppBar.Icon onClick={this.toggleDrawer} navigation={true}>menu</TopAppBar.Icon>

        if (location.hash !== '#/') {
            backButton = <TopAppBar.Icon onClick={this.btnBack} href='#' navigation={true}>
                arrow_back
            </TopAppBar.Icon>
        }

        return <div className={s.app}>
            <TopAppBar onNav={null}>
                <TopAppBar.Row>
                    <TopAppBar.Section align-start={true}>
                        {backButton}
                        <TopAppBar.Title>
                            <Link href='/'>ComicBox</Link>
                        </TopAppBar.Title>
                    </TopAppBar.Section>
                    <TopAppBar.Section align-end={true} class={s.search}>
                        <form onSubmit={this.search}>
                            <input id='search' type='text' ref={e => this.searchInput = e} />
                            <label for='search' onClick={this.searchClick}>
                                <Icon>search</Icon>
                            </label>
                        </form>
                    </TopAppBar.Section>
                </TopAppBar.Row>
            </TopAppBar>

            <main class={s.main}>
                {this.props.children}
            </main>

            <div class={s.bottomBar}>
                {this.menu.map((item, i) => (
                    <Link
                        key={i}
                        href={item.href}
                        class={s.link + ' ' + (location.hash === '#' + item.href ? s.active : '')}
                    >
                        <Icon class={s.icon}>{item.icon}</Icon>
                        <div class={s.title}>{item.name}</div>
                    </Link>
                ))}
            </div>
        </div >
    }

    @autobind
    private btnBack(e: Event) {
        e.preventDefault()
        if (historyPrevious() !== null) {
            historyPop()
            history.back()

            return
        }
        route(this.props.backLink)
    }

    @autobind
    private search(e: Event) {
        e.preventDefault()
        this.searchInput.blur()
        route(`/search/${this.searchInput.value}`)
    }

    @autobind
    private searchClick(e: Event) {
        this.searchInput.select()
    }
}
