import autobind from 'autobind-decorator'
import serialize from 'form-serialize'
import { Component, h } from 'preact'

interface Props {
    submit: (data: any) => void
    validate?: ((data: any) => boolean) | ((data: any) => Promise<boolean>)
}

export default class Form extends Component<Props> {

    public render() {
        return <form onSubmit={this.submit}>
            {this.props.children}
        </form>
    }

    @autobind
    private async submit(e: Event) {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const data = serialize(form, { hash: true, empty: true })

        if (this.props.validate) {
            let valid = this.props.validate(data)
            if (valid instanceof Promise) {
                valid = await valid
            }
            if (!valid) { return }
        }

        this.props.submit(data)
    }
}
