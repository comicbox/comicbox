import autobind from 'autobind-decorator'
import * as s from 'css/read.scss'
import Page from 'js/components/page'
import ReadOverlay from 'js/components/read-overlay'
import Book from 'js/model/book'
import User from 'js/model/user'
import { debounce } from 'js/util'
import { Component, h } from 'preact'
import { route } from 'preact-router'

interface Props {
    matches?: { [id: string]: string }
}

interface State {
    book: Book | null
    current: number
    width: number
    height: number
    modalOpen: boolean

    toNext: boolean
}

export default class Read extends Page<Props, State> {
    private img: HTMLImageElement
    private user: User | null = null

    constructor(props: Props) {
        super(props)
        User.me().then(me => this.user = me)

        this.state = {
            book: null,
            current: 0,
            width: 0,
            height: 0,
            modalOpen: false,

            toNext: false,
        }

        let touch: any = null

        const save = (e: any) => {
            touch = e.changedTouches[0]
        }
        const move = (e: any) => {
            if (!this.state.modalOpen) {
                const changed = e.changedTouches[0]
                const delta = Math.abs(touch.clientX - changed.clientX)
                if (delta < 50) {
                    return
                }

                if (changed.clientX > touch.clientX) {
                    this.stepPage(-1)()
                } else if (changed.clientX < touch.clientX) {
                    this.stepPage(1)()
                }
            }
        }

        const press = (e: any) => {
            if (e.code === 'ArrowRight') {
                this.stepPage(1)()
            } else if (e.code === 'ArrowLeft') {
                this.stepPage(-1)()
            }
        }

        window.addEventListener('touchstart', save.bind(this), false)
        window.addEventListener('touchend', move.bind(this), false)

        window.addEventListener('keyup', press.bind(this), false)

        window.addEventListener('resize', debounce(this.adjustAreaRegions, 250))
        this.adjustAreaRegions()
    }

    public pageLoad() {
        const id = this.props.matches!.id

        this.loadBookState(id)
    }

    public render() {
        if (this.state.book === null) {
            return <div />
        }

        const page = this.state.book.pages[this.state.current]

        const width = this.state.width
        const height = this.state.height

        const leftBox = '0,0,' + Math.floor(width / 3) + ',' + height
        const rightBox = 2 * Math.floor(width / 3) + ',0,' + width + ',' + height
        const centerBox = Math.floor(width / 3) + ',0,' + 2 * Math.floor(width / 3) + ',' + height

        return <div className={s.reader}>
            <img
                src={page.url + '?height=500'}
                className={s.imgResponsive}
                useMap='#image-map'
                ref={e => this.img = e}
                onLoad={this.adjustAreaRegions}
            />

            <map name='image-map'>
                <area target='' onClick={this.stepPage(-1)} alt='left' coords={leftBox} shape='rect' />
                <area target='' onClick={this.toggleModal} alt='center' coords={centerBox} shape='rect' />
                <area target='' onClick={this.stepPage(1)} alt='right' coords={rightBox} shape='rect' />
            </map>

            <ReadOverlay
                show={this.state.modalOpen}

                currentPage={this.state.current}
                maxPage={this.state.book.pages.length}

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
    private initBook(book: Book) {
        let pageNum = 0

        const pageMatch = this.props.matches!.page
        if (pageMatch !== '') {
            pageNum = Number(pageMatch)
        } else {
            pageNum = book.current_page || pageNum
        }

        book.current_page = pageNum
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
    private adjustAreaRegions() {
        if (this.img === undefined) {
            return
        }
        const width = this.img.width
        const height = this.img.height

        this.setState({
            width: width,
            height: height,
        })
    }

    @autobind
    private changePage(dst: number) {
        const book = this.state.book
        if (book === null) {
            return
        }

        if (dst < book.pages.length && dst > -1) {
            // TODO update progress to dst
            book.current_page = dst
            this.save()

            this.setState({
                current: dst,
                book: book,
                width: 0,
                height: 0,
            })
        }

    }

    @autobind
    private stepPage(step: number): () => void {
        if (this.state.book === null) {
            return () => null
        }

        return () => {
            const book = this.state.book

            if (!book) {
                return
            }

            const dst = this.state.current + step
            if (dst < book.pages.length && dst > -1) {
                book.current_page = dst
                this.save()

                this.setState({
                    current: dst,
                    book: book,
                    width: 0,
                    height: 0,
                })
            } else if (dst === book.pages.length) {
                this.next()
            }
        }
    }

    @autobind
    private async next() {
        const bk = this.state.book
        if (!bk) {
            return
        }
        let query = Book.where('series', bk.series)
        if (bk.volume) {
            query = query.where('volume', `(${bk.volume}:]`)
        }
        if (bk.chapter) {
            query = query.where('chapter', `(${bk.chapter}:]`)
        }
        const book = await query.first()

        if (book != null) {
            route('/book/' + book.id, true)
        } else {
            route('/series/' + bk.series)
        }
    }

    @autobind
    private save() {
        if (this.user !== null && this.user.id !== '00000000-0000-0000-0000-000000000000' && this.state.book) {
            this.state.book.save()
        }
    }
}
