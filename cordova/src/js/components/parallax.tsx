import * as s from 'css/parallax.scss'
import { Component, h } from 'preact'

export default class Parallax extends Component<JSX.HTMLAttributes> {

    public render() {
        const notSrcProps = { ...this.props }
        delete notSrcProps.src
        delete notSrcProps.srcset

        return <div {...notSrcProps} class={s.parallax + ' ' + notSrcProps.class}>
            <img
                // class={s.parallax__layer + ' ' + s.parallaxLayerBack}
                src={this.props.src}
                srcset={this.props.srcset}
                alt={this.props.alt}
            />
        </div>
    }

}
