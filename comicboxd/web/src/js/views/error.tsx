import * as s from 'css/error.scss'
import Layout from 'js/views/layout'
import { Component, h } from 'preact'

export default class Error extends Component {
    public render() {

        return <Layout backLink='/'>
            <div className={s.message}>
                404 Page Not Found
            </div>
        </Layout>
    }
}
