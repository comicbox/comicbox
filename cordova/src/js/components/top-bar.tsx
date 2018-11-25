import autobind from 'autobind-decorator'
import * as s from 'css/top-bar.scss'
import { historyPop, historyPrevious } from 'js/history'
import { Component, h } from 'preact'
import Icon from 'preact-material-components/Icon'
import { route } from 'preact-router'

interface Props {
    backLink: string
    scroller: HTMLElement
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
            this.scroller = document.getElementById('parallax-wrap')

            window.requestAnimationFrame(this.frame)
        })
    }

    public render() {
        let backButton = <Icon />
        // <TopAppBar.Icon onClick={this.toggleDrawer} navigation={true}>menu</TopAppBar.Icon>

        if (location.hash !== '#/') {
            backButton = <Icon onClick={this.btnBack} href='#' navigation={true}>
                arrow_back
            </Icon>
        }

        return <header {...this.props} class={s.topBar + ' ' + this.props.class} ref={e => this.header = e}>
            <section class={s.left}>{backButton}</section>
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
        const scrollTop = this.scroller.scrollTop

        if (this.lastScrollTop !== scrollTop && this.header) {
            this.offset = clamp(this.offset + this.lastScrollTop - scrollTop, -headerHeight, 0)

            this.header.style.top = this.offset + 'px'

            if (scrollTop + this.offset === 0 && this.props.clear) {
                this.header.style.backgroundColor = 'rgba(0,0,0,0)'
                this.header.style.backgroundImage = 'linear-gradient(black, rgba(0,0,0,0))'
            } else {
                this.header.style.backgroundColor = null
                this.header.style.backgroundImage = null
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