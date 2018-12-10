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

// tslint:disable-next-line:max-classes-per-file
export class ParallaxWrap extends Component<JSX.HTMLAttributes> {

    public render() {
        return <div {...this.props} class={s.parallaxWrap + ' ' + this.props.class}>
            {this.props.children}
        </div>
    }

}
