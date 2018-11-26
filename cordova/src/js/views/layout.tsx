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
    clearTopBar?: boolean
}

interface State {
    drawerOpened: boolean
}

export default class Layout extends Component<Props, State> {

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
        return <div className={s.app}>

            <TopBar backLink={this.props.backLink} scroller={null} clear={this.props.clearTopBar} />

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
