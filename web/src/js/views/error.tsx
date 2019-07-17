import route from 'js/routes'
import Layout from 'js/views/layout'
import { Component, h } from 'preact'

export default class Error extends Component {
    public render() {

        return <Layout back={route('home')} breadcrumbs={[]}>
            <h1>404 Page Not Found</h1>
        </Layout>
    }
}
