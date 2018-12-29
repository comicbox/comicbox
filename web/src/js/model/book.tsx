import autobind from 'autobind-decorator'
import * as editS from 'css/edit.scss'
import Modal, { OpenModal } from 'js/components/modal'
import { Model, prop, table } from 'js/model/model'
import { h } from 'preact'
import TextField from 'preact-material-components/TextField'

class Page {
    @prop('Int')
    public file_number: number

    @prop('PageType')
    public type: string

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
    public chapter: number

    @prop('Float')
    public community_rating: number

    @prop('Page', { jsType: Page })
    public cover: Page

    @prop('DateTime')
    public created_at: Date

    @prop('Int')
    public current_page: number

    @prop('DateTime')
    public date_released: Date

    @prop('String')
    public file: string

    @prop('[String]')
    public genres: string[]

    @prop('ID')
    public id: string

    @prop('Int')
    public last_page_read: number

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

    public get link() {
        return `/book/${this.id}`
    }

    public get sortIndex() {
        return `book-${this.series}-${(this.volume + '').padStart(6, '0')}-${(this.chapter + '').padStart(6, '0')}`
    }

    @autobind
    public async openEditModal() {

        const alternate_seriesChange = (e: Event) => {
            if (e.target instanceof HTMLInputElement) {
                this.alternate_series = e.target.value
            }
        }

        const authorsChange = (e: Event) => {
            if (e.target instanceof HTMLInputElement) {
                if (e.target.value === '') {
                    this.authors = []
                } else {
                    this.authors = e.target.value.split(',').map(tag => tag.trim().replace(/ /g, '_'))
                }
            }
        }

        const chapterChange = (e: Event) => {
            if (e.target instanceof HTMLInputElement) {
                this.chapter = Number(e.target.value)
            }
        }

        const community_ratingChange = (e: Event) => {
            if (e.target instanceof HTMLInputElement) {
                this.community_rating = Number(e.target.value)
            }
        }

        const date_releasedChange = (e: Event) => {
            if (e.target instanceof HTMLInputElement) {
                this.date_released = new Date(e.target.value)
            }
        }

        const genresChange = (e: Event) => {
            if (e.target instanceof HTMLInputElement) {
                if (e.target.value === '') {
                    this.genres = []
                } else {
                    this.genres = e.target.value.split(',').map(tag => tag.trim().replace(/ /g, '_'))
                }
            }
        }

        const ratingChange = (e: Event) => {
            if (e.target instanceof HTMLInputElement) {
                this.rating = Number(e.target.value)
            }
        }

        const story_arcChange = (e: Event) => {
            if (e.target instanceof HTMLInputElement) {
                this.story_arc = e.target.value
            }
        }

        const titleChange = (e: Event) => {
            if (e.target instanceof HTMLInputElement) {
                this.title = e.target.value
            }
        }

        const summaryChange = (e: Event) => {
            if (e.target instanceof HTMLInputElement) {
                this.summary = e.target.value
            }
        }

        const volumeChange = (e: Event) => {
            if (e.target instanceof HTMLInputElement) {
                if (e.target.value === '') {
                    this.volume = null
                } else {
                    this.volume = Number(e.target.value)
                }
            }
        }

        const webChange = (e: Event) => {
            if (e.target instanceof HTMLInputElement) {
                this.web = e.target.value
            }
        }

        const formSubmit = async () => {
            await this.save()
        }

        await OpenModal(<Modal.Surface formSubmit={formSubmit}>
            <Modal.Title>
                Edit {this.title}
            </Modal.Title>
            <Modal.Body>
                <TextField
                    class={editS.element}
                    label='Alternate Series'
                    value={this.alternate_series}
                    onChange={alternate_seriesChange}
                />
                <TextField
                    class={editS.element}
                    label='Authors'
                    value={this.authors.join(', ')}
                    onChange={authorsChange}
                />
                <TextField
                    class={editS.element}
                    label='Chapter'
                    type='number'
                    value={this.chapter + ''}
                    onChange={chapterChange}
                />
                <TextField
                    class={editS.element}
                    label='Community Rating'
                    type='number'
                    value={this.community_rating + ''}
                    onChange={community_ratingChange}
                />
                <TextField
                    class={editS.element}
                    label='Date Released'
                    type='date'
                    value={this.date_released ? this.date_released.toISOString() : ''}
                    onChange={date_releasedChange}
                />
                <TextField
                    class={editS.element}
                    label='Genres'
                    value={this.genres.join(', ')}
                    onChange={genresChange}
                />
                <TextField
                    class={editS.element}
                    label='Rating'
                    type='number'
                    value={this.rating + ''}
                    onChange={ratingChange}
                />
                <TextField
                    class={editS.element}
                    label='Story Arc'
                    value={this.story_arc}
                    onChange={story_arcChange}
                />
                <TextField
                    class={editS.element}
                    label='Summary'
                    value={this.summary}
                    onChange={summaryChange}
                />
                <TextField
                    class={editS.element}
                    label='Title'
                    value={this.title}
                    onChange={titleChange}
                />
                <TextField
                    class={editS.element}
                    label='Volume'
                    type='number'
                    value={this.volume + ''}
                    onChange={volumeChange}
                />
                <TextField
                    class={editS.element}
                    label='Web'
                    value={this.web}
                    onChange={webChange}
                />
            </Modal.Body>
            <Modal.Actions>
                <Modal.Button action='close'>Close</Modal.Button>
                <Modal.Button action='accept' submit>Save</Modal.Button>
            </Modal.Actions>
        </Modal.Surface>)
    }
}
