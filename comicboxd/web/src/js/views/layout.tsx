import * as React from 'preact'
import * as M from 'materialize-css'

import * as s from 'css/layout.scss'

interface Props {

}

interface State {

}

export default class Layout extends React.Component<Props, State> {

    componentDidMount() {

        var elems = document.querySelectorAll('.sidenav');
        var instances = M.Sidenav.init(elems, {});
    }

    render(): React.ComponentChild {

        return <div className={s.app}>
            <ul id="slide-out" className="sidenav">
                <li>
                    <div className="user-view">
                        <div className="background">
                            <img src="https://materializecss.com/images/office.jpg1" />
                        </div>
                        <a href="#user"><img className="circle" src="https://materializecss.com/images/yuna.jpg" /></a>
                        <a href="#name"><span className="white-text name">John Doe</span></a>
                        <a href="#email"><span className="white-text email">jdandturk@gmail.com</span></a>
                    </div>
                </li>
                <li><a href="#!"><i className="material-icons">cloud</i>First Link With Icon</a></li>
                <li><a href="#!">Second Link</a></li>
                <li><div className="divider"></div></li>
                <li><a className="subheader">Subheader</a></li>
                <li><a className="waves-effect" href="#!">Third Link With Waves</a></li>
            </ul>
            <a href="#" data-target="slide-out" class="sidenav-trigger"><i class="material-icons">menu</i></a>

            {this.props.children}
        </div>
    }

}