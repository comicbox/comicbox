import * as s from 'css/layout.scss'
import { endBottomBar, startBottomBar } from 'js/components/snack'
import TopBar, { Crumb } from 'js/components/top-bar'
import Series from 'js/model/series'
import { Component, h } from 'preact'
import Icon from 'preact-material-components/Icon'
import { Link, route } from 'preact-router'

interface Props {
    backLink: string
    clearTopBar?: boolean
    breadcrumbs: Crumb[]
}

export default class Layout extends Component<Props> {

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
                name: 'Random',
                icon: 'help',
                onClick: async () => {
                    const list = await Series.take(0).get()
                    const series = await Series.skip(Math.floor(Math.random() * list.total)).first()
                    route(series.link)
                },
            },
            {
                name: 'Settings',
                icon: 'settings',
                href: '/settings',
            },
        ]
    }

    public componentDidMount() {
        startBottomBar()
    }

    public componentWillUnmount() {
        endBottomBar()
    }

    public render() {
        return <div className={s.app}>

            <TopBar
                backLink={this.props.backLink}
                clear={this.props.clearTopBar}
                breadcrumbs={this.props.breadcrumbs}
            />

            <main class={s.main}>
                {this.props.children}
            </main>

            <div class={s.bottomBar}>
                {this.menu.map((item, i) => (
                    <Link
                        key={i}
                        href={item.href}
                        onClick={item.onClick}
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
