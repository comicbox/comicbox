import * as s from 'css/book.scss'
import Card from 'js/components/card'
import Book from 'js/model/book'
import { Model, ModelArray } from 'js/model/model'
import Series from 'js/model/series'
import { Component, h } from 'preact'

interface Props<T extends Model> {
    items: T[] | Promise<T[]> | ModelArray<T> | Promise<ModelArray<T>>
}

interface State<T extends Model> {
    items: T[]
}
export default class ModelList<T extends Model> extends Component<Props<T>, State<T>> {

    public async componentDidMount() {
        this.setState({ items: [] })
        if (Array.isArray(this.props.items)) {
            this.setState({ items: this.props.items })
        } else {
            const books = await this.props.items

            this.setState({ items: books })
        }
    }

    public render() {
        const items: T[] = this.state.items || []

        return (<div className={s.bookList} >
            {items.map((item, i) => {

                let options: Dictionary<(model: Model) => void>
                if (item instanceof Book) {
                    options = bookOptions
                } else if (item instanceof Series) {
                    options = seriesOptions
                }
                return <Card key={i} data={item} options={options} />
            })}
        </div>)
    }

}

const seriesOptions: Dictionary<(model: Series) => void> = {
    'Add to Reading': series => {
        series.list = 'READING'
        series.save()
    },
    'Add to Paused': series => {
        series.list = 'PAUSED'
        series.save()
    },
    'Add to Complected': series => {
        series.list = 'COMPLETED'
        series.save()
    },
    'Add to Dropped': series => {
        series.list = 'DROPPED'
        series.save()
    },
    'Add to Planning': series => {
        series.list = 'PLANNING'
        series.save()
    },
}

const bookOptions: Dictionary<(model: Book) => void> = {
    'Mark as read': book => {
        book.current_page = book.pages.length
        book.save()
    },
    'Mark as unread': book => {
        book.current_page = 0
        book.save()
    },
}
