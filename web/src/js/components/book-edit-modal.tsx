import autobind from 'autobind-decorator'
import * as s from 'css/edit.scss'
import Book from 'js/model/book'
import { Component, h } from 'preact'
import TabBar from 'preact-material-components/TabBar'
import TextField from 'preact-material-components/TextField'
import Modal from './modal'
import TabContainer from './tab-container';

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
                            onChange={this.alternateSeriesChange}
                        />
                        <TextField
                            class={s.element}
                            label='Authors'
                            value={book.authors.join(', ')}
                            onChange={this.authorsChange}
                        />
                        <TextField
                            class={s.element}
                            label='Chapter'
                            type='number'
                            value={book.chapter + ''}
                            onChange={this.chapterChange}
                        />
                        <TextField
                            class={s.element}
                            label='Community Rating'
                            type='number'
                            value={book.community_rating + ''}
                            onChange={this.communityRatingChange}
                        />
                        <TextField
                            class={s.element}
                            label='Date Released'
                            type='date'
                            value={book.date_released ? book.date_released.toISOString() : ''}
                            onChange={this.dateReleasedChange}
                        />
                        <TextField
                            class={s.element}
                            label='Genres'
                            value={book.genres.join(', ')}
                            onChange={this.genresChange}
                        />
                        <TextField
                            class={s.element}
                            label='Rating'
                            type='number'
                            value={book.rating + ''}
                            onChange={this.ratingChange}
                        />
                        <TextField
                            class={s.element}
                            label='Story Arc'
                            value={book.story_arc}
                            onChange={this.storyArcChange}
                        />
                        <TextField
                            class={s.element}
                            label='Summary'
                            value={book.summary}
                            onChange={this.summaryChange}
                        />
                        <TextField
                            class={s.element}
                            label='Title'
                            value={book.title}
                            onChange={this.titleChange}
                        />
                        <TextField
                            class={s.element}
                            label='Volume'
                            type='number'
                            value={book.volume + ''}
                            onChange={this.volumeChange}
                        />
                        <TextField
                            class={s.element}
                            label='Web'
                            value={book.web}
                            onChange={this.webChange}
                        />
                    </div>
                    <div title='Pages'>
                        pages
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
    private alternateSeriesChange(e: TEvent<HTMLInputElement>) {
        this.props.book.alternate_series = e.target.value
    }

    @autobind
    private authorsChange(e: TEvent<HTMLInputElement>) {
        if (e.target.value === '') {
            this.props.book.authors = []
        } else {
            this.props.book.authors = e.target.value.split(',').map(tag => tag.trim().replace(/ /g, '_'))
        }
    }

    @autobind
    private chapterChange(e: TEvent<HTMLInputElement>) {
        if (e.target.value === '') {
            this.props.book.chapter = null
        } else {
            this.props.book.chapter = Number(e.target.value)
        }
    }

    @autobind
    private communityRatingChange(e: TEvent<HTMLInputElement>) {
        this.props.book.community_rating = Number(e.target.value)
    }

    @autobind
    private dateReleasedChange(e: TEvent<HTMLInputElement>) {
        this.props.book.date_released = new Date(e.target.value)
    }

    @autobind
    private genresChange(e: TEvent<HTMLInputElement>) {
        if (e.target.value === '') {
            this.props.book.genres = []
        } else {
            this.props.book.genres = e.target.value.split(',').map(tag => tag.trim().replace(/ /g, '_'))
        }
    }

    @autobind
    private ratingChange(e: TEvent<HTMLInputElement>) {
        this.props.book.rating = Number(e.target.value)
    }

    @autobind
    private storyArcChange(e: TEvent<HTMLInputElement>) {
        this.props.book.story_arc = e.target.value
    }

    @autobind
    private titleChange(e: TEvent<HTMLInputElement>) {
        this.props.book.title = e.target.value
    }

    @autobind
    private summaryChange(e: TEvent<HTMLInputElement>) {
        this.props.book.summary = e.target.value
    }

    @autobind
    private volumeChange(e: TEvent<HTMLInputElement>) {
        if (e.target.value === '') {
            this.props.book.volume = null
        } else {
            this.props.book.volume = Number(e.target.value)
        }

    }

    @autobind
    private webChange(e: TEvent<HTMLInputElement>) {
        this.props.book.web = e.target.value
    }

    @autobind
    private async formSubmit() {
        await this.props.book.save()
    }
}
