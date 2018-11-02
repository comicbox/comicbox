import { cache } from 'js/cache'
import { Component, h } from 'preact'

interface State {
    src: string
}

interface Props extends JSX.HTMLAttributes {
    cache?: boolean
}

export default class CacheImg extends Component<Props, State> {

    public componentWillMount() {
        if (this.props.cache !== false) {
            cache(this.props.src).then(url => {
                this.setState({ src: url })
            })
            this.setState({ src: undefined })
        } else {
            this.setState({ src: this.props.src })
        }
    }

    public render() {
        return <img {...this.props as any} src={this.state.src} />
    }

}
