import { Model, prop, table } from 'js/model/model'
import Book from './book'

@table('series', 'series', 'SeriesInput!', 'name')
export default class Series extends Model {

    @prop('[Book]', Book)
    public books: Book[]

    @prop('List')
    public list: number

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
