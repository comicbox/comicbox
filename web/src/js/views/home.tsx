import auth from 'js/auth'
import LoginPrompt from 'js/components/loginPrompt'
import ModelList from 'js/components/model-list'
import Book from 'js/model/book'
import { ModelArray } from 'js/model/model'
import Series from 'js/model/series'
import Layout from 'js/views/layout'
import { Component, h } from 'preact'

interface State {
    guest: boolean
}

export default class Home extends Component<{}, State> {

    constructor(props: {}) {
        super(props)
        this.state = {
            guest: true,
        }
        auth.guest().then(guest => this.setState({ guest: guest }))
    }

    public render() {

        // Book.take(1).with(Series.select('name')).first().then(console.log)
        const sections: JSX.Element[] = []

        if (!this.state.guest) {
            const reading = Series
                .where('list', 'READING')
                .with(Book.where('read', false).take(1))
                .get()
            const paused = Series
                .where('list', 'PAUSED')
                .with(Book.where('read', false).take(1))
                .get()
            sections.push(
                <h1>Current</h1>,
                <ModelList key='reading' items={firstBook(reading)} />,
                <h1>Paused</h1>,
                <ModelList key='paused' items={firstBook(paused)} />,
            )
        } else {
            sections.push(<LoginPrompt />)
        }

        return <Layout backLink='/' breadcrumbs={[]}>
            {sections}
            <h1>New Chapters</h1>
            <ModelList key='new' items={Book.sort('!created_at').take(15).get()} />
        </Layout >
    }
}

async function firstBook(seriesP: Promise<ModelArray<Series>>): Promise<Book[]> {
    const series = await seriesP
    return series.filter(s => s.books.length > 0).map(s => s.books[0])
}
