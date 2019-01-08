import autobind from 'autobind-decorator'
import * as s from 'css/edit.scss'
import Book from 'js/model/book'
import { Component, h } from 'preact'
import CheckBox from 'preact-material-components/Checkbox'
import FormField from 'preact-material-components/FormField'
import Radio from 'preact-material-components/Radio'
import Switch from 'preact-material-components/Switch'
import TextField from 'preact-material-components/TextField'
import LazyImg from './lazy-img'
import Modal from './modal'
import TabContainer from './tab-container'
import { getFormData } from 'js/util';

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
        return <Modal.Surface formSubmit={this.formSubmit}>
            <Modal.Title>
                Edit {book.title}
            </Modal.Title>
            <Modal.Body>
                <TabContainer>
                    <div title='Meta'>
                        <TextField
                            class={s.element}
                            label='Alternate Series'
                            value={book.alternate_series}
                            onKeyUp={this.alternateSeriesChange}
                        />
                        <TextField
                            class={s.element}
                            label='Authors'
                            value={book.authors.join(', ')}
                            onKeyUp={this.authorsChange}
                        />
                        <TextField
                            class={s.element}
                            label='Chapter'
                            type='number'
                            value={book.chapter + ''}
                            onKeyUp={this.chapterChange}
                        />
                        <TextField
                            class={s.element}
                            label='Community Rating'
                            type='number'
                            value={book.community_rating + ''}
                            onKeyUp={this.communityRatingChange}
                        />
                        <TextField
                            class={s.element}
                            label='Date Released'
                            type='date'
                            value={book.date_released ? book.date_released.toISOString() : ''}
                            onKeyUp={this.dateReleasedChange}
                        />
                        <TextField
                            class={s.element}
                            label='Genres'
                            value={book.genres.join(', ')}
                            onKeyUp={this.genresChange}
                        />
                        <TextField
                            class={s.element}
                            label='Rating'
                            type='number'
                            value={book.rating + ''}
                            onKeyUp={this.ratingChange}
                        />
                        <TextField
                            class={s.element}
                            label='Story Arc'
                            value={book.story_arc}
                            onKeyUp={this.storyArcChange}
                        />
                        <TextField
                            class={s.element}
                            label='Summary'
                            value={book.summary}
                            onKeyUp={this.summaryChange}
                        />
                        <TextField
                            class={s.element}
                            label='Title'
                            value={book.title}
                            onKeyUp={this.titleChange}
                        />
                        <TextField
                            class={s.element}
                            label='Volume'
                            type='number'
                            value={book.volume + ''}
                            onKeyUp={this.volumeChange}
                        />
                        <TextField
                            class={s.element}
                            label='Web'
                            value={book.web}
                            onKeyUp={this.webChange}
                        />
                    </div>
                    <div title='Pages' class={s.pageList}>

                        {book.pages.map((page, i) => <div key={page.file_number} class={s.page}>
                            <LazyImg src={page.url + '?height=150'} />
                            {/* <RadioGroup name={`page-${i}`} value={page.type} class={s.radio}>
                                <RadioOption value='FrontCover'>Cover</RadioOption>
                                <RadioOption value='Story'>Story</RadioOption>
                                <RadioOption value='Deleted'>Deleted</RadioOption>
                            </RadioGroup> */}
                            <div>
                                <input type='hidden' name={`pages[${i}][file_number]`} value={page.file_number} />
                                <FormField>
                                    <CheckBox name={`pages[${i}][deleted]`} id={`deleted-${i}`} />
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
    private alternateSeriesChange(e: TEvent) {
        this.props.book.alternate_series = e.target.value
    }

    @autobind
    private authorsChange(e: TEvent) {
        if (e.target.value === '') {
            this.props.book.authors = []
        } else {
            this.props.book.authors = e.target.value.split(',').map(tag => tag.trim().replace(/ /g, '_'))
        }
    }

    @autobind
    private chapterChange(e: TEvent) {
        if (e.target.value === '') {
            this.props.book.chapter = null
        } else {
            this.props.book.chapter = Number(e.target.value)
        }
    }

    @autobind
    private communityRatingChange(e: TEvent) {
        this.props.book.community_rating = Number(e.target.value)
    }

    @autobind
    private dateReleasedChange(e: TEvent) {
        this.props.book.date_released = new Date(e.target.value)
    }

    @autobind
    private genresChange(e: TEvent) {
        if (e.target.value === '') {
            this.props.book.genres = []
        } else {
            this.props.book.genres = e.target.value.split(',').map(tag => tag.trim().replace(/ /g, '_'))
        }
    }

    @autobind
    private ratingChange(e: TEvent) {
        this.props.book.rating = Number(e.target.value)
    }

    @autobind
    private storyArcChange(e: TEvent) {
        this.props.book.story_arc = e.target.value
    }

    @autobind
    private titleChange(e: TEvent) {
        this.props.book.title = e.target.value
    }

    @autobind
    private summaryChange(e: TEvent) {
        this.props.book.summary = e.target.value
    }

    @autobind
    private volumeChange(e: TEvent) {
        if (e.target.value === '') {
            this.props.book.volume = null
        } else {
            this.props.book.volume = Number(e.target.value)
        }

    }

    @autobind
    private webChange(e: TEvent) {
        this.props.book.web = e.target.value
    }

    @autobind
    private async formSubmit(e: Event) {
        const formData = new FormData(e.target as any)

        // for (const [name, d] of data.entries()) {
        //     console.log(name, d)
        // }
        const data = Array.from(formData.entries()).reduce((memo, [key, value]) => ({
            ...memo,
            [key]: value,
        }), {})

        console.log(data)

        // await this.props.book.save()
    }
}
