import autobind from 'autobind-decorator'
import BookEditModal from 'js/components/book-edit-modal'
import { OpenModal } from 'js/components/modal'
import { Model, prop, table } from 'js/model/model'
import route from 'js/routes'
import { h } from 'preact'

export type PageType = 'FrontCover' | 'Story' | 'Deleted'

class Page {
    @prop('Int')
    public file_number: number

    @prop('PageType')
    public type: PageType

    @prop('String')
    public url: string
}

// tslint:disable-next-line:max-classes-per-file
@table('books', 'update_book', 'BookInput!')
export default class Book extends Model {

    @prop('String')
    public alternate_series: string

    @prop('[String]')
    public authors: string[]

    @prop('Float')
    public chapter: number | null

    @prop('Float')
    public community_rating: number

    @prop('Page', { jsType: Page })
    public cover: Page

    @prop('DateTime')
    public created_at: Date

    @prop('Int')
    public current_page: number | null

    @prop('DateTime')
    public date_released: Date

    @prop('String')
    public file: string

    @prop('[String]')
    public genres: string[]

    @prop('ID')
    public id: string

    @prop('Int')
    public last_page_read: number | null

    @prop('[Page]', { jsType: Page })
    public pages: Page[]

    @prop('Float')
    public rating: number

    @prop('Boolean')
    public read: boolean

    @prop('String')
    public series: string

    @prop('String')
    public story_arc: string

    @prop('String')
    public summary: string

    @prop('String')
    public title: string

    @prop('DateTime')
    public updated_at: Date

    @prop('Int')
    public volume: number | null

    @prop('String')
    public web: string

    @prop('ID', { writeOnly: true })
    public after: string

    @prop('ID', { writeOnly: true })
    public before: string

    public get link() {
        return route('book.read', [this.id])
    }

    public get sortIndex() {
        return `book-${this.series}-${(this.volume + '').padStart(6, '0')}-${(this.chapter + '').padStart(6, '0')}`
    }

    @autobind
    public async openEditModal() {
        await OpenModal(<BookEditModal book={this} />)
    }

    public async next() {
        return await Book
            .where('series', this.series)
            .where('after', this.id)
            .first()
    }

    public async previous() {
        return await Book
            .where('series', this.series)
            .where('before', this.id)
            .first()
    }

    public getCurrentPage(): number | null {
        if (this.current_page === null) {
            return null
        }
        let out: number = -1
        for (let i = 0; i < this.current_page + 1; i++) {
            if (this.pages[i].type !== 'Deleted') {
                out++
            }
        }
        return out
    }

    public setCurrentPage(currentPage: number): void {
        const page = this.pages.filter(p => p.type !== 'Deleted')[currentPage]
        this.current_page = this.pages.indexOf(page)
        for (let i = Math.min(this.current_page + 1, this.pages.length); i < this.pages.length; i++) {
            if (this.pages[i].type === 'Deleted') {
                this.current_page = i
            } else {
                break
            }
        }
    }

    public getPage(num: number) {
        return this.pages.filter(p => p.type !== 'Deleted')[num]
    }

    public getPageCount(): number {
        return this.pages.filter(p => p.type !== 'Deleted').length
    }
}
