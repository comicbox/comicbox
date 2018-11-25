import autobind from 'autobind-decorator'
import * as s from 'css/read-overlay.scss'
import { historyPop, historyPrevious } from 'js/history'
import { debounce } from 'js/util'
import { Component, h } from 'preact'
import TopAppBar from 'preact-material-components/TopAppBar'
import { Link, route } from 'preact-router'

interface Props {
    show: boolean

    maxPage: number
    currentPage: number

    onClose: () => void
    onUpdateCurrent: (current: number) => void
}

export default class ReadOverlay extends Component<Props, {}>  {
    private slider: HTMLInputElement

    constructor(props: Props, ctx: any) {
        super(props)
    }

    public render() {
        // Render nothing if the "show" prop is false
        if (!this.props.show) {
            return null
        }

        const backButton = <TopAppBar.Icon onClick={this.btnBack} href='#' navigation={true}>
            arrow_back
        </TopAppBar.Icon>

        return <div className={s.backdrop}>
            <div className={s.modal}>
                <TopAppBar onNav={null}>
                    <TopAppBar.Row>
                        <TopAppBar.Section align-start={true}>
                            {backButton}
                            <TopAppBar.Title>
                                <Link href='/'>ComicBox</Link>
                            </TopAppBar.Title>
                        </TopAppBar.Section>
                    </TopAppBar.Row>
                </TopAppBar>

                <div class={s.filler} onClick={this.props.onClose} />

                <div class={s.footer}>
                    <div class={s.slidecontainer}>
                        <input
                            type='range'
                            min='0'
                            max={this.props.maxPage - 1}
                            value={this.props.currentPage}
                            class={s.slider}
                            onInput={debounce(this.updateSlider, 250)}
                            ref={e => this.slider = e}
                        />
                    </div>
                    <p className={s.progress}>{this.props.currentPage + 1}/{this.props.maxPage}</p>
                    <div className={s.edit}>
                        <button onClick={this.toggleMeta}>
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    }

    @autobind
    private updateSlider() {
        const dst = Number(this.slider.value)
        this.props.onUpdateCurrent(dst)
    }

    @autobind
    private toggleMeta() {
        console.log('Open edit modal')
    }

    @autobind
    private btnBack(e: Event) {
        e.preventDefault()
        if (historyPrevious() !== null) {
            historyPop()
            history.back()

            return
        }
        route('/')
    }
}
