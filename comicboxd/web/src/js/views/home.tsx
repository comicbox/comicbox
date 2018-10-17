import { Component, h } from 'preact'
import Layout from 'js/views/layout'
import SeriesList from 'js/components/series-list';
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

        return <Layout backLink="/">
            <SeriesList list="READING" />
        </Layout >
    }

}