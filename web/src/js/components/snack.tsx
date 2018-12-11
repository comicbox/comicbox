import * as s from 'css/snack.scss'
import url from 'js/url'
import { Component, h } from 'preact'
import Snackbar from 'preact-material-components/Snackbar'

let bar: Snackbar
let snack: Snack

interface State {
    hasBottomBar: boolean
}

export default class Snack extends Component<{}, State> {
    public dialogElement: HTMLElement

    public componentWillMount() {
        snack = this
    }

    public async componentDidMount() {
        const ws = new WebSocket((await url('/api/push')).replace(/^http/, 'ws'))
        ws.onmessage = e => {
            const data = JSON.parse(e.data)

            if ('message' in data) {
                toast(data.message as string)
            }
        }
    }

    public render() {
        return <Snackbar class={this.state.hasBottomBar ? s.bottomBar : ''} ref={e => { bar = e }} />
    }
}

export function toast(message: string): void
export function toast(message: string, actionText: string, actionHandler: () => void): void
export function toast(message: string, actionText?: string, actionHandler?: () => void): void {
    if (!bar || !bar.MDComponent) { return }
    bar.MDComponent.show({
        message: message,
        actionText: actionText || '',
        actionHandler: actionHandler || (() => null),
    })
}

export function startBottomBar() {
    snack.setState({ hasBottomBar: true })
}
export function endBottomBar() {
    snack.setState({ hasBottomBar: false })
}
