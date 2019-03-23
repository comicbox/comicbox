import auth from 'js/auth'
import ModelList from 'js/components/model-list'
import Book from 'js/model/book'
import { ModelArray } from 'js/model/model'
import Series from 'js/model/series'
import User from 'js/model/user'
import Layout from 'js/views/layout'
import { Component, h } from 'preact'

interface State {
    me: User
}

export default class Home extends Component<{}, State> {

    constructor(props: {}) {
        super(props)
        auth.user().then(me => this.setState({ me: me }))
    }

    public render() {
        const reading = Series
            .where('list', 'READING')
            .with(Book.where('read', false).take(1))
            .get()
        const paused = Series
            .where('list', 'PAUSED')
            .with(Book.where('read', false).take(1))
            .get()

        // Book.take(1).with(Series.select('name')).first().then(console.log)
        const sections: JSX.Element[] = []
        if (this.state.me !== null) {
            sections.push(
                <h1>Current</h1>,
                <ModelList items={firstBook(reading)} />,
                <h1>Paused</h1>,
                <ModelList items={firstBook(paused)} />,
            )
        }
        sections.push(
            <h1>New Chapters</h1>,
            <ModelList items={Book.sort('!created_at').take(15).get()} />,
        )
        return <Layout backLink='/' breadcrumbs={[]}>
            {sections}
        </Layout >
    }
}

async function firstBook(seriesP: Promise<ModelArray<Series>>): Promise<Book[]> {
    const series = await seriesP
    return series.filter(s => s.books.length > 0).map(s => s.books[0])
}
