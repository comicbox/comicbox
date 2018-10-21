import * as s from 'css/layout.scss'
import { historyPop, historyPrevious } from 'js/history'
import { Component, h } from 'preact'
import 'preact-material-components/Button/style.css'
import Drawer from 'preact-material-components/Drawer'
import 'preact-material-components/Drawer/style.css'
import List from 'preact-material-components/List'
import 'preact-material-components/List/style.css'
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

    private get menu() {
        return [
            {
                name: 'Home',
                icon: 'home',
                href: '/',
            },
            {
                name: 'Series',
                icon: 'collections_bookmark',
                href: '/series',
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
        let backButton = <TopAppBar.Icon onClick={this.toggleDrawer.call(this)} navigation={true}>menu</TopAppBar.Icon>

        if (location.pathname !== '/') {
            backButton = <TopAppBar.Icon onClick={this.btnBack.call(this)} href='#' navigation={true}>
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
                    <TopAppBar.Section align-end={true}>
                        <TopAppBar.Icon>more_vert</TopAppBar.Icon>
                    </TopAppBar.Section>
                </TopAppBar.Row>
            </TopAppBar>

            <Drawer.TemporaryDrawer open={this.state.drawerOpened} onClose={this.drawerClosed.call(this)}>
                <Drawer.DrawerHeader className='mdc-theme--primary-bg'>
                    Drawer Header
                </Drawer.DrawerHeader>
                <Drawer.DrawerContent>
                    <List>
                        {this.menu.map((item, i) =>
                            <Link key={i} href={item.href} onClick={this.toggleDrawer.call(this)}>
                                <List.LinkItem
                                    className={location.pathname === item.href ? 'mdc-list-item--activated' : ''}
                                >
                                    <List.ItemGraphic>{item.icon}</List.ItemGraphic>
                                    {item.name}
                                </List.LinkItem>
                            </Link>,
                        )}
                    </List>
                </Drawer.DrawerContent>
            </Drawer.TemporaryDrawer>

            <main class={s.main}>
                {this.props.children}
            </main>
        </div >
    }

    private toggleDrawer() {
        this.setState({
            drawerOpened: !this.state.drawerOpened,
        })
    }

    private drawerClosed() {
        this.setState({
            drawerOpened: false,
        })
    }

    private btnBack() {
        if (historyPrevious() !== null) {
            historyPop()
            history.back()

            return
        }
        route(this.props.backLink)
    }

}
