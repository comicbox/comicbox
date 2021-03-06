import autobind from 'autobind-decorator'
import * as s from 'css/read.scss'
import Page from 'js/components/page'
import ReadOverlay from 'js/components/read-overlay'
import Book from 'js/model/book'
import User from 'js/model/user'
import route from 'js/routes'
import { debounce, emptyImage } from 'js/util'
import { Component, h } from 'preact'

interface Props {
    matches?: { [id: string]: string }
}

interface State {
    book: Book | null
    current: number
    modalOpen: boolean

    toNext: boolean
}

export default class Read extends Page<Props, State> {
    private img: HTMLImageElement = new Image()
    private user: User | null = null

    private touchDown: Touch | null = null

    constructor(props: Props) {
        super(props)
        User.me().then(me => this.user = me)

        this.state = {
            book: null,
            current: 0,
            modalOpen: false,

            toNext: false,
        }

        window.addEventListener('touchstart', this.touchstart)
        window.addEventListener('touchmove', this.touchmove)
        window.addEventListener('touchend', this.touchend)

        window.addEventListener('keyup', this.keyup)
    }

    public componentWillUnmount() {
        window.removeEventListener('touchstart', this.touchstart)
        window.removeEventListener('touchend', this.touchend)
        window.removeEventListener('touchmove', this.touchmove)
        window.removeEventListener('keyup', this.keyup)
    }

    public pageLoad() {
        const id = this.props.matches!.id

        this.loadBookState(id)
    }

    public render() {
        if (this.state.book === null) {
            return <div />
        }

        const page = this.state.book.getPage(this.state.current) || { url: emptyImage }
        const nextPage = this.state.book.getPage(this.state.current + 1) || { url: emptyImage }
        const previousPage = this.state.book.getPage(this.state.current - 1) || { url: emptyImage }

        return <div className={s.reader}>
            <img
                src={page.url}
                className={s.imgResponsive}
                ref={e => this.img = e}
                onClick={this.clickPage}
            />
            <img
                src={nextPage.url}
                className={s.nextPage}
            />
            <img
                src={previousPage.url}
                className={s.previousPage}
            />

            <ReadOverlay
                show={this.state.modalOpen}

                currentPage={this.state.current}
                maxPage={this.state.book.getPageCount()}

                onClose={this.toggleModal}
                onUpdateCurrent={this.changePage}

                book={this.state.book}
            />
        </div >
    }

    @autobind
    private async loadBookState(id: string) {
        const book = await Book
            .where('id', id)
            .first()

        this.initBook(book)
    }

    @autobind
    private async clickPage(e: MouseEvent) {
        if (e.target instanceof HTMLElement) {
            const per = e.x / e.target.getBoundingClientRect().width

            if (per < 1 / 3) {
                this.stepPage(-1)
            } else if (per > 2 / 3) {
                this.stepPage(1)
            } else {
                this.toggleModal()
            }
        }
    }

    @autobind
    private initBook(book: Book) {
        let pageNum = 0

        const pageMatch = this.props.matches!.page
        if (pageMatch !== '') {
            pageNum = Number(pageMatch)
        } else {
            pageNum = book.getCurrentPage() || pageNum
        }

        book.setCurrentPage(pageNum)
        this.save()

        this.setState({
            current: pageNum,
            book: book,
        })
    }

    @autobind
    private toggleModal() {
        this.setState({
            modalOpen: !this.state.modalOpen,
        })
    }

    @autobind
    private changePage(dst: number) {
        const book = this.state.book
        if (book === null) {
            return
        }

        if (dst < book.getPageCount() && dst > -1) {
            // TODO update progress to dst
            book.setCurrentPage(dst)
            this.save()

            this.setState({
                current: dst,
                book: book,
            })
        }

    }

    @autobind
    private stepPage(step: number): void {
        if (this.state.book === null) {
            return
        }
        const book = this.state.book

        if (!book) {
            return
        }

        const nextPage = this.state.current + step

        if (nextPage < book.getPageCount() && nextPage > -1) {
            book.setCurrentPage(nextPage)
            this.save()

            this.setState({
                current: nextPage,
                book: book,
            })
        } else if (nextPage === book.getPageCount()) {
            this.next()
        } else if (nextPage <= -1) {
            this.previous()
        }
    }

    @autobind
    private async next() {
        if (!this.state.book) { return }

        const book = await this.state.book.next()

        if (book != null) {
            route('book.read', [book.id]).navigate(true)
        } else {
            route('series.view', [this.state.book.series]).navigate()
        }
    }
    @autobind
    private async previous() {
        if (!this.state.book) { return }

        const book = await this.state.book.previous()

        if (book != null) {
            route('book.read', [book.id]).navigate(true)
        } else {
            route('series.view', [this.state.book.series]).navigate()
        }
    }

    @autobind
    private save() {
        if (this.user !== null && this.user.id !== '00000000-0000-0000-0000-000000000000' && this.state.book) {
            this.state.book.save()
        }
    }

    @autobind
    private keyup(e: any) {
        if (e.code === 'ArrowRight') {
            this.stepPage(1)
        } else if (e.code === 'ArrowLeft') {
            this.stepPage(-1)
        }
    }

    @autobind
    private touchstart(e: TouchEvent) {
        if (this.state.modalOpen) { return }

        this.touchDown = e.changedTouches[0]

        this.img.classList.add(s.moving)
    }
    @autobind
    private touchmove(e: TouchEvent) {
        if (this.touchDown === null) { return }

        const touchCurrent = e.changedTouches[0]
        const diff = touchCurrent.clientX - this.touchDown!.clientX
        this.img.style.left = diff + 'px'

        this.img.classList.remove(s.previous)
        this.img.classList.remove(s.next)
        this.img.classList.remove(s.current)
        if (diff > 0) {
            this.img.classList.add(s.previous)
        } else if (diff < 0) {
            this.img.classList.add(s.next)
        } else {
            this.img.classList.add(s.current)
        }
    }
    @autobind
    private touchend(e: TouchEvent) {
        if (this.touchDown === null) { return }

        const touchCurrent = e.changedTouches[0]
        const diff = touchCurrent.clientX - this.touchDown!.clientX
        if (Math.abs(diff) < 100) {
            this.img.classList.remove(s.previous)
            this.img.classList.remove(s.next)
            this.img.classList.add(s.current)
        }

        this.img.classList.remove(s.moving)
        this.img.style.left = ''
        setTimeout(() => {
            if (this.img.classList.contains(s.next)) {
                this.stepPage(1)
            }
            if (this.img.classList.contains(s.previous)) {
                this.stepPage(-1)
            }
            this.img.classList.remove(s.previous)
            this.img.classList.remove(s.next)
            this.img.classList.remove(s.current)
        }, 500)

        this.touchDown = null
    }

}
