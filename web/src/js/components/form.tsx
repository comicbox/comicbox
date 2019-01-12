import { Component, h } from 'preact'

interface Props {
    submit: () => void
}

export default class Form extends Component<Props> {

    public render() {
        return <form action="">
            {this.props.children}
        </form>
    }

}