import * as s from 'css/layout.scss'
import { endBottomBar, startBottomBar } from 'js/components/snack'
import TopBar, { Crumb } from 'js/components/top-bar'
import Series from 'js/model/series'
import route, { Router } from 'js/routes'
import { Component, h } from 'preact'
import Icon from 'preact-material-components/Icon'
import { Link } from 'preact-router'

interface Props {
    back: Router
    clearTopBar?: boolean
    breadcrumbs: Crumb[]
}

export default class Layout extends Component<Props> {

    private get menu() {
        return [
            {
                name: 'Home',
                icon: 'home',
                route: route('home'),
            },
            {
                name: 'Lists',
                icon: 'view_list',
                route: route('list.index'),
            },
            {
                name: 'Series',
                icon: 'collections_bookmark',
                route: route('series.index'),
            },
            {
                name: 'Settings',
                icon: 'settings',
                route: route('settings'),
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
                back={this.props.back}
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
                        href={item.route.url}
                        class={s.link + ' ' + (location.hash === '#' + item.route.url ? s.active : '')}
                    >
                        <Icon class={s.icon}>{item.icon}</Icon>
                        <div class={s.title}>{item.name}</div>
                    </Link>
                ))}
            </div>
        </div >
    }
}
