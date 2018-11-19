import ModelList from 'js/components/model-list'
import Series from 'js/model/series'
import Layout from 'js/views/layout'
import { Component, h } from 'preact'

export default class List extends Component {

    public render() {
        const reading = Series.where('list', 'READING').get()
        const completed = Series.where('list', 'COMPLETED').get()
        const dropped = Series.where('list', 'DROPPED').get()
        const paused = Series.where('list', 'PAUSED').get()
        const planning = Series.where('list', 'PLANNING').get()

        return <Layout backLink='/'>
            <h1>Reading</h1>
            <ModelList items={reading} />
            <h1>Completed</h1>
            <ModelList items={completed} />
            <h1>Dropped</h1>
            <ModelList items={dropped} />
            <h1>Paused</h1>
            <ModelList items={paused} />
            <h1>Planning</h1>
            <ModelList items={planning} />
        </Layout >
    }

}
