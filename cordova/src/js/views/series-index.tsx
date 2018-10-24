import ModelList from 'js/components/model-list'
import Series from 'js/model/series'
import Layout from 'js/views/layout'
import { Component, h } from 'preact'

export default class SeriesIndex extends Component {

    public render() {

        return <Layout backLink='/'>
            <h1>Series</h1>
            <ModelList items={Series.where('name', '!=', '').get()} />
        </Layout >
    }

}
