import autobind from 'autobind-decorator'
import * as s from 'css/read-overlay.scss'
import TopBar from 'js/components/top-bar'
import { historyPop, historyPrevious } from 'js/history'
import Book from 'js/model/book'
import { debounce } from 'js/util'
import { Component, h } from 'preact'
import Button from 'preact-material-components/Button'
import Slider from 'preact-material-components/Slider'
import TopAppBar from 'preact-material-components/TopAppBar'
import { Link, route } from 'preact-router'

interface Props {
    show: boolean

    maxPage: number
    currentPage: number

    onClose: () => void
    onUpdateCurrent: (current: number) => void

    book: Book
}

export default class ReadOverlay extends Component<Props, {}>  {
    private slider: Slider

    public render() {
        // Render nothing if the "show" prop is false
        if (!this.props.show) {
            return null
        }

        return <div className={s.backdrop}>
            <div className={s.modal}>
                <TopBar
                    backLink={'/'}
                    breadcrumbs={[
                        {
                            name: 'Series',
                            href: `/series`,
                        },
                        {
                            name: this.props.book.series,
                            href: `/series/${this.props.book.series}`,
                        },
                    ]}
                />

                <div class={s.filler} onClick={this.props.onClose} />

                <div class={s.footer}>
                    <Slider
                        min={0}
                        max={this.props.maxPage - 1}
                        value={this.props.currentPage}
                        class={s.slider}
                        onInput={debounce(this.updateSlider, 250)}
                        discrete
                        ref={e => this.slider = e}
                    />
                    <p className={s.progress}>{this.props.currentPage + 1}/{this.props.maxPage}</p>
                    <div className={s.edit}>
                        <Button onClick={this.toggleMeta} raised secondary>
                            Edit
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    }

    @autobind
    private updateSlider() {
        const dst = this.slider.getValue()

        this.props.onUpdateCurrent(dst)
    }

    @autobind
    private toggleMeta() {
        this.props.book.openEditModal()
    }
}
