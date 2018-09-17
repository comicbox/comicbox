import { Component, h } from 'preact'
import Layout from 'js/views/layout'

import * as s from 'css/error.scss'

interface Props {

}

interface State {

}

export default class Error extends Component<Props, State> {
    render() {
        console.log(this.props);

        return <Layout>
            <div className={s.message}>
                404 Page Not Found
            </div>
        </Layout>
    }

}