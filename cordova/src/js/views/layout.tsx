import autobind from 'autobind-decorator'
import * as s from 'css/layout.scss'
import { ParallaxWrap } from 'js/components/parallax'
import TopBar from 'js/components/top-bar'
import { historyPop, historyPrevious } from 'js/history'
import { Component, h } from 'preact'
import Icon from 'preact-material-components/Icon'
import TopAppBar from 'preact-material-components/TopAppBar'
import { Link, route } from 'preact-router'

interface Props {
    backLink: string
    hideTopBar?: number
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
        // let backButton = <TopAppBar.Icon />
        // // <TopAppBar.Icon onClick={this.toggleDrawer} navigation={true}>menu</TopAppBar.Icon>

        // if (location.hash !== '#/') {
        //     backButton = <TopAppBar.Icon onClick={this.btnBack} href='#' navigation={true}>
        //         arrow_back
        //     </TopAppBar.Icon>
        // }


        return <div className={s.app}>

            {/* <TopAppBar onNav={null} fixed>
                <TopAppBar.Row>
                    <TopAppBar.Section align-start={true}>
                        <TopAppBar.Icon href='#' navigation={true}>
                            arrow_back
                        </TopAppBar.Icon>
                        <TopAppBar.Title>
                            <Link href='/'>ComicBox</Link>
                        </TopAppBar.Title>
                    </TopAppBar.Section>
                    <TopAppBar.Section align-end={true} class={s.search}>
                        <form>
                            <input type='text' ref={e => this.searchInput = e} />
                            <label for='search'>
                                <Icon>search</Icon>
                            </label>
                        </form>
                    </TopAppBar.Section>
                </TopAppBar.Row>
            </TopAppBar> */}

            <TopBar backLink={this.props.backLink} scroller={null} clear={this.props.hideTopBar} />

            <ParallaxWrap id='parallax-wrap'>

                <main class={s.main}>
                    {this.props.children}
                </main>
            </ParallaxWrap>

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
}
