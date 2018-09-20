import { Component, h } from 'preact'
import Layout from 'js/views/layout'
import BookList from 'js/components/book-list';
import * as s from 'css/home.scss'
import SeriesList from 'js/components/series-list';

interface Props {

}

interface State {

}

export default class SeriesIndex extends Component<Props, State> {

    componentDidMount() {

    }

    render() {

        return <Layout>
            <SeriesList />
        </Layout >
    }

}