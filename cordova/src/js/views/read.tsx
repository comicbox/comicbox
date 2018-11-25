import autobind from 'autobind-decorator'
import * as s from 'css/read.scss'
import Book from 'js/model/book'
import Modal from 'js/views/read-modal'
import { Component, h } from 'preact'


interface Props {
    matches?: { [id: string]: string }
}

interface State {

    pages: string[]
    current: number
    width: number
    height: number
    modalOpen: boolean
}

export default class Read extends Component<Props, State> {
    private img: HTMLImageElement

    public constructor() {
        super()
        this.state = {
            pages: [],
            current: 0,
            width: 0,
            height: 0,
            modalOpen: false,
        }
    }

    public async componentWillMount() {
        const id = this.props.matches.id
        const pageMatch = this.props.matches.page
        let pageNum = 0
        if (pageMatch !== '') {
            pageNum = Number(pageMatch)
        }
        const bookQuery = Book
            .select('pages')
            .where('id', '=', id)
            .get()

        const book = await bookQuery
        const pages = book[0].pages.map(page => page.url)

        this.setState((state: State, props: Props) => {
            return {
                pages: pages,
                current: pageNum,
                width: 0,
                height: 0,
                modalOpen: false,
            }
        })
    }

    public componentDidMount() {
        window.addEventListener('resize', this.debounce(this.adjustAreaRegions, 250))
        this.adjustAreaRegions()
    }

    public render() {
        const page = this.state.pages[this.state.current]

        const width = this.state.width
        const height = this.state.height

        const leftBox = '0,0,' + Math.floor(width / 3) + ',' + height
        const rightBox = 2 * Math.floor(width / 3) + ',0,' + width + ',' + height
        const centerBox = Math.floor(width / 3) + ',0,' + 2 * Math.floor(width / 3) + ',' + height

        return <div className={s.reader}>
            <img
                src={page}
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

            <Modal
                show={this.state.modalOpen}

                id={this.props.matches.id}
                currentPage={this.state.current}
                maxPage={this.state.pages.length}

                onClose={this.toggleModal}
                onUpdateCurrent={this.changePage}
            >
            </Modal>
        </div >
    }

    private debounce(fn: any, delay: number) {
        let timer: any = null
        return () => {
          const context = this
          const args = arguments
          clearTimeout(timer)
          timer = setTimeout(() => {
            fn.apply(context, args)
          }, delay)
        }
      }

    @autobind
    private toggleModal()  {
        this.setState((state: State, props: Props) => {
            return {
                pages: state.pages,
                current: state.current,
                width: state.width,
                height: state.height,
                modalOpen: !state.modalOpen,
            }
        })
      }

    @autobind
    private adjustAreaRegions() {
        const width = this.img.width
        const height = this.img.height

        this.setState((state: State, props: Props) => {
            return {
                pages: state.pages,
                current: state.current,
                width: width,
                height: height,
                modalOpen: state.modalOpen,
            }
        })
    }

    @autobind
    private changePage(dst: number) {
        this.setState((state: State, props: Props) => {
            if (dst < state.pages.length && dst > -1) {
                // TODO update progress to dst
                return {
                    pages: state.pages,
                    current: dst,
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
        return () => this.setState((state: State, props: Props) => {
            const dst = state.current + step
            if (dst < state.pages.length && dst > -1) {
                // TODO update progress to dst
                return {
                    pages: state.pages,
                    current: dst,
                    width: 0,
                    height: 0,
                    modalOpen: state.modalOpen,
                }
            }
            return state
        })
    }
}
