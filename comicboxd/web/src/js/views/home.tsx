import { Component, h } from 'preact'
import Layout from 'js/views/layout'
import BookList from 'js/components/book-list';
import * as s from 'css/home.scss'

interface Props {

}

interface State {

}

export default class Home extends Component<Props, State> {

    componentDidMount() {

    }

    render() {
        console.log(this.props);

        return <Layout>
            <BookList />
        </Layout >
    }

}