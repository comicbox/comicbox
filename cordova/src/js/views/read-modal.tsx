import * as s from 'css/read.scss'
import MetaModal from 'js/views/meta-modal'
import { Component, h } from 'preact'
import autobind from 'autobind-decorator';
import TopAppBar from 'preact-material-components/TopAppBar'
import { Link, route } from 'preact-router'



interface Props {
    show: boolean

    id: string
    maxPage: number
    currentPage: number

    onClose: () => void
    onUpdateCurrent: (current: number) => void
}

interface State {
    current: number
    max: number
    metaModel: boolean
}

export default class Modal extends Component<Props, State>  {
    private slider: HTMLInputElement

    constructor(props: Props, ctx: any) {
        super(props)
        this.state = {
            current: this.props.currentPage,
            max: this.props.maxPage,
            metaModel: false,
        }
    }

    public render() {
        // Render nothing if the "show" prop is false
        if(!this.props.show) {
            return null
        }

        let backButton = <TopAppBar.Icon />

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

                <div className="close">
                    <button onClick={this.props.onClose}>
                        Close
                    </button>
                </div>

                <div class={s.slidecontainer}>
                    <input 
                        type="range"
                        min="0"
                        max={this.props.maxPage-1} 
                        value={this.props.currentPage} 
                        class={s.slider} 
                        onInput={this.debounce(this.updateSlider, 250)}
                        ref={e => this.slider = e}
                    />
                </div>
                <p>{this.state.current}/{this.state.max}</p>
                <div className="edit">
                    <button onClick={this.toggleMeta}>
                        Edit
                    </button>
                </div>
                <MetaModal
                    show={this.state.metaModel}
                    onClose={this.toggleMeta}
                    id={this.props.id}
                >
                </MetaModal>
            </div>
        </div>
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
    private updateSlider() {
        this.props.onUpdateCurrent(Number(this.slider.value))
    }

    @autobind
    private toggleMeta() {
        this.setState((state: State, props: Props) => {
            return {
                current: state.current,
                max: state.max,
                metaModel: !state.metaModel,
            }
        })
    }
}
