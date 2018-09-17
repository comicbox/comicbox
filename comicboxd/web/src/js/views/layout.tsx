import { Component, h } from 'preact'
import Drawer from 'preact-material-components/ts/Drawer';
import List from 'preact-material-components/ts/List';
import Button from 'preact-material-components/ts/Button';
import { Link } from 'preact-router';

import * as s from 'css/layout.scss'
import 'preact-material-components/Drawer/style.css';
import 'preact-material-components/List/style.css';
import 'preact-material-components/Button/style.css';

interface Props {

}

interface State {
    drawerOpened: boolean
}

export default class Layout extends Component<Props, State> {
    constructor() {
        super();
        this.state = {
            drawerOpened: false
        };
    }
    componentDidMount() {
    }

    openDrawer() {
        console.log("open")
        this.setState({
            drawerOpened: !this.state.drawerOpened
        })
    }

    render() {

        return <div className={s.app}>
            <Button onClick={this.openDrawer.bind(this)}>
                Open Drawer
            </Button>
            <Drawer.TemporaryDrawer open={this.state.drawerOpened} onClose={() => {
                this.setState({
                    drawerOpened: false
                });
            }}>
                <Drawer.DrawerHeader className="mdc-theme--primary-bg">
                    Components
                </Drawer.DrawerHeader>
                <Drawer.DrawerContent>
                    <List>
                        <List.LinkItem>
                            {/* <List.ItemIcon>home</List.ItemIcon> */}
                            Home
                            </List.LinkItem>
                    </List>
                </Drawer.DrawerContent>
            </Drawer.TemporaryDrawer>
            <main>
                {this.props.children}
            </main>
        </div >
    }

}