import autobind from 'autobind-decorator'
import * as s from 'css/read.scss'
import ReadOverlay from 'js/components/read-overlay'
import Book from 'js/model/book'
import User from 'js/model/user'
import { debounce } from 'js/util'
import { Component, h } from 'preact'

interface Props {
    matches?: { [id: string]: string }
}

interface State {
    book: Book
    current: number
    width: number
    height: number
    modalOpen: boolean
}

export default class Read extends Component<Props, State> {
    private img: HTMLImageElement
    private user: User = null

    public constructor() {
        super()
        User.me().then(me => this.user = me)

        this.state = {
            book: null,
            current: 0,
            width: 0,
            height: 0,
            modalOpen: false,
        }
    }

    public async componentWillMount() {
        const id = this.props.matches.id

        const bookQuery = Book
            .select(
                'id',
                'pages',
                'current_page',

                'alternate_series',
                'authors',
                'series',
                'story_arc',
                'summary',
                'title',
                'genres',
                )
            .where('id', '=', id)
            .first()

        const bk = await bookQuery
        console.log(bk)
        let pageNum = 0

        const pageMatch = this.props.matches.page
        if (pageMatch !== '') {
            pageNum = Number(pageMatch)
        }

        const update = bk.current_page || pageNum
        bk.current_page = update
        this.save()

        this.setState({
                current: update,
                book: bk,
        })
    }

    public componentDidMount() {
        window.addEventListener('resize', debounce(this.adjustAreaRegions, 250))
        this.adjustAreaRegions()
    }

    public render() {
        if (this.state.book === null) {
            return
        }

        console.log(this.state)
        const page = this.state.book.pages[this.state.current]

        const width = this.state.width
        const height = this.state.height

        const leftBox = '0,0,' + Math.floor(width / 3) + ',' + height
        const rightBox = 2 * Math.floor(width / 3) + ',0,' + width + ',' + height
        const centerBox = Math.floor(width / 3) + ',0,' + 2 * Math.floor(width / 3) + ',' + height

        return <div className={s.reader}>
            <img
                src={page.url}
                className={s.imgResponsive}
                useMap={`#image-map`}
                ref={e => this.img = e}
                onLoad={this.adjustAreaRegions}
            />

            <map name='image-map'>
                <area target='' onClick={this.stepPage(-1)} alt='left' coords={leftBox} shape='rect' />
                <area target='' onClick={this.toggleModal} alt='center' coords={centerBox}  shape='rect' />
                <area target='' onClick={this.stepPage(1)} alt='right' coords={rightBox}  shape='rect' />
            </map>

            <ReadOverlay
                show={this.state.modalOpen}

                currentPage={this.state.current}
                maxPage={this.state.book.pages.length}

                onClose={this.toggleModal}
                onUpdateCurrent={this.changePage}
            />
        </div >
    }

    @autobind
    private toggleModal()  {
        this.setState((state: State, props: Props) => {
            return {
                boo: state.book,
                width: state.width,
                height: state.height,
                modalOpen: !state.modalOpen,
            }
        })
      }

    @autobind
    private adjustAreaRegions() {
        if (this.img === undefined) {
            return
        }
        const width = this.img.width
        const height = this.img.height

        this.setState((state: State, props: Props) => {
            return {
                book: state.book,
                width: width,
                height: height,
                modalOpen: state.modalOpen,
            }
        })
    }

    @autobind
    private changePage(dst: number) {
        if (this.state.book === null) {
            return
        }

        this.setState((state: State, props: Props) => {
            if (dst < state.book.pages.length && dst > -1) {
                // TODO update progress to dst
                const bk = state.book
                bk.last_page_read = bk.current_page
                bk.current_page = dst
                this.save()

                return {
                    current: dst,
                    book: bk,
                    width: 0,
                    height: 0,
                    modalOpen: state.modalOpen,
                }
            }
            return state
        })
    }

    @autobind
    private stepPage(step: number): () => void  {
        if (this.state.book === null) {
            return
        }

        return () => this.setState((state: State, props: Props) => {
            const dst = state.book.current_page + step
            if (dst < state.book.pages.length && dst > -1) {
                const bk = state.book
                bk.last_page_read = bk.current_page
                bk.current_page = dst
                this.save()

                return {
                    current: dst,
                    book: bk,
                    width: 0,
                    height: 0,
                    modalOpen: state.modalOpen,
                }
            }
            return state
        })
    }

    @autobind
    private save() {
        if (this.user !== null && this.user.id != '00000000-0000-0000-0000-000000000000') {
            console.log(this.user)
            this.state.book.save()
        }
    }
}
