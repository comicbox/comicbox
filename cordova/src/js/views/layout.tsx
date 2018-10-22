import autobind from 'autobind-decorator'
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
        const backButton = <TopAppBar.Icon onClick={this.toggleDrawer} navigation={true}>menu</TopAppBar.Icon>

        // if (location.pathname !== '/') {
        //     backButton = <TopAppBar.Icon onClick={this.btnBack} href='#' navigation={true}>
        //         arrow_back
        //     </TopAppBar.Icon>
        // }

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

            <Drawer modal={true} open={this.state.drawerOpened} onClose={this.drawerClosed}>
                <Drawer.DrawerHeader className='mdc-theme--primary-bg'>
                    Drawer Header
                </Drawer.DrawerHeader>
                <Drawer.DrawerContent>
                    <List>
                        {this.menu.map((item, i) =>
                            <Link key={i} href={item.href} onClick={this.toggleDrawer}>
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
            </Drawer>

            <main class={s.main}>
                {this.props.children}
            </main>
        </div >
    }

    @autobind
    private toggleDrawer() {
        this.setState({
            drawerOpened: !this.state.drawerOpened,
        })
    }

    @autobind
    private drawerClosed() {
        this.setState({
            drawerOpened: false,
        })
    }

    @autobind
    private btnBack() {
        if (historyPrevious() !== null) {
            historyPop()
            history.back()

            return
        }
        route(this.props.backLink)
    }

}
