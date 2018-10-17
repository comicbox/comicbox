import { Component, h } from 'preact'
import Drawer from 'preact-material-components/Drawer';
import List from 'preact-material-components/List';
import TopAppBar from 'preact-material-components/TopAppBar';
import { Link, route } from 'preact-router';

import * as s from 'css/layout.scss'
import 'preact-material-components/Drawer/style.css';
import 'preact-material-components/List/style.css';
import 'preact-material-components/Button/style.css';
import 'preact-material-components/TopAppBar/style.css';
import { historyPrevious, historyPop } from 'js/history';


interface Props {
    backLink: string
}

interface State {
    drawerOpened: boolean
}

export default class Layout extends Component<Props, State> {

    get menu() {
        return [
            {
                name: "Home",
                icon: "home",
                href: "/"
            },
            {
                name: "Series",
                icon: "collections_bookmark",
                href: "/series"
            },
        ]
    }

    constructor() {
        super();
        this.state = {
            drawerOpened: false
        };
    }
    componentDidMount() {
    }

    toggleDrawer() {
        this.setState({
            drawerOpened: !this.state.drawerOpened
        })
    }

    btnBack() {
        if (historyPrevious() !== null) {
            historyPop()
            history.back()
            
            return
        }
        route(this.props.backLink)
    }

    render() {
        let backButton = <TopAppBar.Icon onClick={this.toggleDrawer.bind(this)} navigation>menu</TopAppBar.Icon>

        if (location.pathname !== "/") {
            backButton = <TopAppBar.Icon onClick={this.btnBack.bind(this)} href="#" navigation>arrow_back</TopAppBar.Icon>
        }

        return <div className={s.app}>
            <TopAppBar onNav={() => { }}>
                <TopAppBar.Row>
                    <TopAppBar.Section align-start>
                        {backButton}
                        <TopAppBar.Title>
                            <Link href="/">ComicBox</Link>
                        </TopAppBar.Title>
                    </TopAppBar.Section>
                    <TopAppBar.Section align-end>
                        <TopAppBar.Icon>more_vert</TopAppBar.Icon>
                    </TopAppBar.Section>
                </TopAppBar.Row>
            </TopAppBar>

            <Drawer.TemporaryDrawer open={this.state.drawerOpened} onClose={() => this.setState({ drawerOpened: false })}>
                <Drawer.DrawerHeader className="mdc-theme--primary-bg">
                    Components
                </Drawer.DrawerHeader>
                <Drawer.DrawerContent>
                    <List>
                        {this.menu.map(item =>
                            <Link href={item.href} onClick={this.toggleDrawer.bind(this)}>
                                <List.LinkItem className={location.pathname === item.href ? "mdc-list-item--activated" : ""}>
                                    <List.ItemGraphic>{item.icon}</List.ItemGraphic>
                                    {item.name}
                                </List.LinkItem>
                            </Link>
                        )}
                    </List>
                </Drawer.DrawerContent>
            </Drawer.TemporaryDrawer>

            <main class={s.main}>
                {this.props.children}
            </main>
        </div >
    }

}