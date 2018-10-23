import { Model, prop, table } from 'js/model/model'

@table('books')
export default class Book extends Model {
    @prop('ID!')
    public id: string

    @prop('String')
    public series: string

    @prop('Float')
    public chapter: string

    @prop('Int')
    public volume: string

}
