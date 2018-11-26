import { Model, ModelArray, prop, table } from 'js/model/model'
import Book from './book'

export type List = 'PLANNING' | 'READING' | 'COMPLETED' | 'PAUSED' | 'DROPPED'

@table('series', 'series', 'SeriesInput!', 'name', 'String!')
export default class Series extends Model {

    @prop('[Book]', { jsType: Book })
    public books: ModelArray<Book>

    @prop('List')
    public list: List

    @prop('[String]')
    public tags: string[]

    @prop('String')
    public name: string

    @prop('Int')
    public read: number

    @prop('Int')
    public total: number

    public get id() {
        return this.name
    }

    public get link() {
        return `/series/${this.name}`
    }

    public get sortIndex() {
        return `series-${this.name}`
    }
}
