import * as s from 'css/book.scss'
import Card from 'js/components/card'
import { Model, ModelArray } from 'js/model/model'
import { QueryBuilder } from 'js/model/query-builder'
import { Component, h } from 'preact'

interface Props<T extends Model> extends JSX.HTMLAttributes {
    items: T[] | Promise<T[]> | ModelArray<T> | Promise<ModelArray<T>> | QueryBuilder<T>
}

interface State<T extends Model> {
    items: T[]
}
export default class ModelList<T extends Model> extends Component<Props<T>, State<T>> {

    public async componentWillMount() {
        const items = this.props.items
        this.setState({ items: [] })
        if (Array.isArray(items)) {
            this.setState({ items: items })
        } else if (items instanceof Promise) {
            const books = await items

            this.setState({ items: books })
        } else if (items instanceof QueryBuilder) {
            const books = await items.skip(0).take(15).get()
            const newBooks = []

            for (let i = 0; i < books.total; i++) {
                newBooks.push(books[i] || null)
            }
            this.setState({ items: newBooks })
        }
    }

    public render() {
        const items: T[] = this.state.items || []

        return (<div {...this.props} class={this.props.class + ' ' + s.bookList}>
            {items.map((item, i) => {
                if (item) {
                    return <Card key={i} data={item} />

                } else if (this.props.items instanceof QueryBuilder) {
                    return <Card key={i + 'unset'} data={null} loadQuery={this.props.items.skip(i)} />

                } else {
                    return <Card key={i + 'undefined'} data={null} />
                }
            })}
        </div>)
    }
}
