import Layout from 'js/views/layout'
import { Component, h } from 'preact'

export default class Error extends Component {
    public render() {

        return <Layout backLink='/' breadcrumbs={[]}>
            <h1>404 Page Not Found</h1>
        </Layout>
    }
}
