import ModelList from 'js/components/model-list'
import Book from 'js/model/book'
import Series from 'js/model/series'
import Layout from 'js/views/layout'
import { Component, h } from 'preact'

export default class List extends Component {

    public render() {
        const firstBook = Book.take(1)
        const reading = Series
            .where('list', 'READING')
            .with(firstBook)
            .get()
        const completed = Series
            .where('list', 'COMPLETED')
            .with(firstBook)
            .get()
        const dropped = Series
            .where('list', 'DROPPED')
            .with(firstBook)
            .get()
        const paused = Series
            .where('list', 'PAUSED')
            .with(firstBook)
            .get()
        const planning = Series
            .where('list', 'PLANNING')
            .with(firstBook)
            .get()

        return <Layout backLink='/' breadcrumbs={[]}>
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
