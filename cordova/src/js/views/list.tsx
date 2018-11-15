import ModelList from 'js/components/model-list'
import Series from 'js/model/series'
import Layout from 'js/views/layout'
import { Component, h } from 'preact'

export default class List extends Component {

    public render() {
        const reading = Series.where('name', '!=', '').skip(6).take(2).get({ cache: false })
        const completed = Series.where('name', '!=', '').skip(33).take(2).get({ cache: false })
        return <Layout backLink='/'>
            <h1>Reading</h1>
            <ModelList items={reading} />
            <h1>Completed</h1>
            <ModelList items={completed} />
        </Layout >
    }

}
