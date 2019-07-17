import autobind from 'autobind-decorator'
import * as s from 'css/edit.scss'
import serialize from 'form-serialize'
import Book, { PageType } from 'js/model/book'
import { dateInput } from 'js/util'
import { Component, h } from 'preact'
import CheckBox from 'preact-material-components/Checkbox'
import FormField from 'preact-material-components/FormField'
import TextField from 'preact-material-components/TextField'
import LazyImg from './lazy-img'
import Modal from './modal'
import TabContainer from './tab-container'

interface TEvent extends KeyboardEvent {
    target: HTMLInputElement
}

interface Props {
    book: Book
}
export default class BookEditModal extends Component<Props> {
    private img: HTMLImageElement

    public render() {
        const book = this.props.book
        return <Modal.Surface formSubmit={this.formSubmit} key={book.id}>
            <Modal.Title>
                Edit {book.title}
            </Modal.Title>
            <Modal.Body>
                <TabContainer>
                    <div title='Meta' class={s.form}>
                        <fieldset>
                            <h3>Basic Info</h3>
                            <TextField
                                class={s.element}
                                label='Series'
                                value={book.series}
                                name='series'
                            />
                            <TextField
                                class={s.element}
                                label='Volume'
                                type='number'
                                value={book.volume + ''}
                                name='volume'
                            />
                            <TextField
                                class={s.element}
                                label='Chapter'
                                type='number'
                                value={book.chapter + ''}
                                name='chapter'
                            />
                            <TextField
                                class={s.element}
                                label='Title'
                                value={book.title}
                                name='title'
                            />
                            <TextField
                                class={s.element}
                                label='Authors'
                                value={book.authors.join(', ')}
                                name='authors'
                            />
                        </fieldset>

                        <fieldset>
                            <h3>Ratings</h3>
                            <TextField
                                class={s.element}
                                label='My Rating'
                                type='number'
                                value={book.rating + ''}
                                name='rating'
                            />
                            <TextField
                                class={s.element}
                                label='Community Rating'
                                type='number'
                                value={book.community_rating + ''}
                                name='community_rating'
                            />
                        </fieldset>

                        <fieldset>
                            <h3>Extra Info</h3>
                            <TextField
                                class={s.element}
                                label='Date Released'
                                type='date'
                                value={book.date_released ? dateInput(book.date_released) : ''}
                                name='date_released'
                            />
                            <TextField
                                class={s.element}
                                label='Genres'
                                value={book.genres.join(', ')}
                                name='genres'
                            />
                            <TextField
                                class={s.element}
                                label='Story Arc'
                                value={book.story_arc}
                                name='story_arc'
                            />
                            <TextField
                                class={s.element}
                                label='Summary'
                                value={book.summary}
                                name='summary'
                            />
                            <TextField
                                class={s.element}
                                label='Web'
                                value={book.web}
                                name='web'
                            />
                        </fieldset>
                    </div>
                    <div title='Pages' class={s.pageList}>

                        {book.pages.map((page, i) => <div key={page.file_number} class={s.page}>
                            <LazyImg src={page.url + '?height=150'} />
                            <div>
                                <input type='hidden' name={`pages[${i}][file_number]`} value={page.file_number} />
                                <FormField>
                                    <CheckBox
                                        name={`pages[${i}][deleted]`}
                                        id={`deleted-${i}`}
                                        checked={page.type === 'Deleted'}
                                    />
                                    <label for={`deleted-${i}`}>Deleted</label>
                                </FormField>
                            </div>
                        </div>)}
                    </div>
                </TabContainer>
            </Modal.Body>
            <Modal.Actions>
                <Modal.Button action='close'>Close</Modal.Button>
                <Modal.Button action='accept' submit>Save</Modal.Button>
            </Modal.Actions>
        </Modal.Surface>
    }

    @autobind
    private async formSubmit(e: Event) {
        const data: {
            pages: Array<{
                file_number: string,
                deleted?: 'on',
            }>,
            series: string,
            alternate_series: string,
            authors: string,
            chapter: string,
            community_rating: string,
            date_released: string,
            genres: string,
            rating: string,
            story_arc: string,
            summary: string,
            title: string,
            volume: string,
            web: string,
        } = serialize(e.target as any, { hash: true, empty: true })

        let hadCover = false
        if (data.pages) {
            this.props.book.pages = data.pages.map(page => {
                let type: PageType = page.deleted ? 'Deleted' : 'Story'
                if (!page.deleted && !hadCover) {
                    hadCover = true
                    type = 'FrontCover'
                }
                return {
                    file_number: Number(page.file_number),
                    type: type,
                    url: '',
                }
            })
        } else {
            this.props.book.series = data.series
            this.props.book.alternate_series = data.alternate_series
            this.props.book.authors = data.authors.split(',')
            this.props.book.chapter = Number(data.chapter)
            this.props.book.community_rating = Number(data.community_rating)
            this.props.book.date_released = new Date(data.date_released)
            this.props.book.genres = data.genres.split(',')
            this.props.book.rating = Number(data.rating)
            this.props.book.story_arc = data.story_arc
            this.props.book.summary = data.summary
            this.props.book.title = data.title
            this.props.book.volume = Number(data.volume)
            this.props.book.web = data.web
        }

        await this.props.book.save()
    }
}
