import autobind from 'autobind-decorator'
import * as s from 'css/top-bar.scss'
import { historyPop, historyPrevious } from 'js/history'
import { Component, h } from 'preact'
import Icon from 'preact-material-components/Icon'
import { route } from 'preact-router'

interface Props {
    backLink: string
    scroller?: HTMLElement
    clear?: boolean
}

const headerHeight = 56

export default class TopBar extends Component<Props & JSX.HTMLAttributes> {

    private searchInput: HTMLInputElement

    private scroller: HTMLElement
    private header: HTMLElement

    private offset: number = 1
    private lastScrollTop: number = -1

    public componentDidMount() {
        setTimeout(() => {
            this.scroller = document.getElementById('parallax-wrap') as HTMLElement

            window.requestAnimationFrame(this.frame)
        })
    }

    public render() {
        return <header {...this.props} class={s.topBar + ' ' + this.props.class} ref={e => this.header = e}>
            <section class={s.left}>
                <Icon onClick={this.btnBack} href='#' navigation={true}>
                    arrow_back
                </Icon>
            </section>
            <section class={s.right}>
                <form onSubmit={this.search}>
                    <input id='search' type='text' ref={e => this.searchInput = e} />
                    <label for='search' onClick={this.searchClick}>
                        <Icon>search</Icon>
                    </label>
                </form>
            </section>
        </header>
    }

    @autobind
    private frame() {
        if (!this.scroller) {
            this.header.style.top = '0px'
            return
        }

        const scrollTop = this.scroller.scrollTop

        if (this.lastScrollTop !== scrollTop && this.header) {
            this.offset = clamp(this.offset + this.lastScrollTop - scrollTop, -headerHeight, 0)

            this.header.style.top = this.offset + 'px'

            if (scrollTop + this.offset === 0 && this.props.clear) {
                this.header.classList.add(s.hidden)
            } else {
                this.header.classList.remove(s.hidden)
            }

            this.lastScrollTop = scrollTop
        }
        window.requestAnimationFrame(this.frame)
    }

    @autobind
    private btnBack(e: Event) {
        e.preventDefault()
        if (historyPrevious() !== null) {
            historyPop()
            history.back()

            return
        }
        route(this.props.backLink)
    }

    @autobind
    private search(e: Event) {
        e.preventDefault()
        this.searchInput.blur()
        route(`/search/${this.searchInput.value}`)
    }

    @autobind
    private searchClick(e: Event) {
        this.searchInput.select()
    }
}

function clamp(num: number, min: number, max: number): number {
    return num <= min ? min : num >= max ? max : num
}
