import { Model, prop, table } from 'js/model/model'

class Page {
    @prop('Int')
    public file_number: number

    @prop('PageType')
    public type: string

    @prop('String')
    public url: string
}

// tslint:disable-next-line:max-classes-per-file
@table('books')
export default class Book extends Model {

    @prop('String')
    public alternate_series: string

    @prop('[String]')
    public authors: string[]

    @prop('Float')
    public chapter: number

    @prop('Float')
    public community_rating: number

    @prop('Page', Page)
    public cover: Page

    @prop('DateTime')
    public created_at: string

    @prop('Int')
    public current_page: number

    @prop('DateTime')
    public date_released: string

    @prop('String')
    public file: string

    @prop('[String]')
    public genres: string[]

    @prop('ID')
    public id: string

    @prop('Int')
    public last_page_read: number

    @prop('[Page]', Page)
    public pages: Page[]

    @prop('Float')
    public rating: number

    @prop('Boolean')
    public read: boolean

    @prop('String')
    public reading_direction: string

    @prop('String')
    public series: string

    @prop('String')
    public story_arc: string

    @prop('String')
    public summary: string

    @prop('String')
    public title: string

    @prop('String')
    public type: string

    @prop('DateTime')
    public updated_at: string

    @prop('Int')
    public volume: number

    @prop('String')
    public web: string

}
