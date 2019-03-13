import autobind from 'autobind-decorator'
import * as s from 'css/top-bar.scss'
import auth from 'js/auth'
import { historyPop, historyPrevious } from 'js/history'
import User from 'js/model/user'
import { Component, h } from 'preact'
import Icon from 'preact-material-components/Icon'
import { Link, route } from 'preact-router'

export interface Crumb {
    name: string
    href: string
}

interface Props {
    backLink: string
    clear?: boolean
    breadcrumbs: Crumb[]
}

interface State {
    user: User
}

const headerHeight = 56

export default class TopBar extends Component<Props & JSX.HTMLAttributes, State> {

    private searchInput: HTMLInputElement

    private header: HTMLElement

    private offset: number = 1
    private lastScrollTop: number = -1

    constructor(props: Props) {
        super(props)
        auth.user().then(me => this.setState({ user: me }))
        auth.addEventListener('change', this.userChange)
    }

    public componentDidMount() {
        setTimeout(() => {
            window.requestAnimationFrame(this.frame)
        })
    }

    public componentWillUnmount() {
        auth.removeEventListener('change', this.userChange)
    }
    public render() {
        return <header {...this.props} class={s.topBar + ' ' + this.props.class} ref={e => this.header = e}>
            <section class={s.left}>
                <Icon onClick={this.btnBack} href='#' navigation={true}>
                    arrow_back
                </Icon>
                <div className={s.breadcrumbs}>
                    <Link href='/'>
                        <Icon class={s.home}>home</Icon>
                    </Link>
                    {this.props.breadcrumbs.map(crumb => <Link key={crumb.href} href={crumb.href}>
                        <Icon class={s.arrow}>chevron_right</Icon>
                        {crumb.name}
                    </Link>)}
                {this.state.user ? this.state.user.name : ''}
                </div>
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
        const scrollTop = document.documentElement!.scrollTop

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

    @autobind
    private userChange(e: Event) {
        console.log(e)
    }
}

function clamp(num: number, min: number, max: number): number {
    return num <= min ? min : num >= max ? max : num
}
