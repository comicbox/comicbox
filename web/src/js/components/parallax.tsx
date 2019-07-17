import autobind from 'autobind-decorator'
import * as s from 'css/parallax.scss'
import { Component, h } from 'preact'

export default class Parallax extends Component<JSX.HTMLAttributes> {

    private img: HTMLImageElement
    private mounted: boolean = true

    constructor(props: JSX.HTMLAttributes) {
        super(props)

        window.requestAnimationFrame(this.frame)
    }

    public componentWillUnmount() {
        this.mounted = false
    }
    public render() {
        const notSrcProps = { ...this.props }
        delete notSrcProps.src
        delete notSrcProps.srcset

        return <div {...notSrcProps} class={s.parallax + ' ' + notSrcProps.class}>
            <img
                ref={e => this.img = e}
                src={this.props.src}
                srcset={this.props.srcset}
                alt={this.props.alt}
            />
        </div>
    }

    @autobind
    private frame() {
        if (this.img) {
            const scrollTop = document.documentElement!.scrollTop
            this.img.style.transform = `translate3D(0, ${scrollTop / 2}px, 0)`
        }
        if (this.mounted) {
            window.requestAnimationFrame(this.frame)
        }
    }

}
