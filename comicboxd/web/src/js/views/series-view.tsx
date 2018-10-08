import { Component, h } from 'preact'
import Layout from 'js/views/layout'
import BookList from 'js/components/book-list';
import * as s from 'css/home.scss'

interface Props {
    matches?: { [name: string]: string }
}

interface State {

}

export default class SeriesView extends Component<Props, State> {

    componentDidMount() {
        console.log()
    }

    render() {
        console.log(this.props);

        return <Layout>
            <BookList series={this.props.matches.name} page={Number(this.props.matches.page) || 0} />
        </Layout >
    }

}