import autobind from 'autobind-decorator'
import { Component, h } from 'preact'

interface Props {
    submit: (data: any) => void
}

export default class Form extends Component<Props> {

    public render() {
        return <form onSubmit={this.submit}>
            {this.props.children}
        </form>
    }

    @autobind
    private submit(e: Event) {
        e.preventDefault()
        const form = e.target as HTMLFormElement

        this.props.submit(e)
    }
}
