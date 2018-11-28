import { MDCDialog } from '@material/dialog'
import autobind from 'autobind-decorator'
import { Component, h } from 'preact'

let dialog: MDCDialog & { open: () => void }
let modal: Modal

interface SurfaceProps {
    formSubmit?: (e: Event) => void
}
class ModalSurface extends Component<SurfaceProps & JSX.HTMLAttributes> {
    public render() {
        if (this.props.formSubmit) {
            return <div {...this.props} class='mdc-dialog__surface'>
                <form onSubmit={this.formSubmit}>
                    {this.props.children}
                </form>
            </div>
        }
        return <div {...this.props} class='mdc-dialog__surface'>
            {this.props.children}
        </div>
    }

    @autobind
    private formSubmit(e: Event) {
        e.preventDefault()
        this.props.formSubmit(e)
    }
}

// tslint:disable-next-line:max-classes-per-file
class ModalTitle extends Component<JSX.HTMLAttributes> {
    public render() {
        return <h2 {...this.props} class='mdc-dialog__title'>
            {this.props.children}
        </h2>
    }
}

// tslint:disable-next-line:max-classes-per-file
class ModalBody extends Component<JSX.HTMLAttributes> {
    public render() {
        return <div
            {...this.props}
            class='mdc-dialog__content'
            style={{
                overflowY: 'scroll',
                height: 'calc(100vh - 175px)',
            }}
        >
            {this.props.children}
        </div>
    }
}

// tslint:disable-next-line:max-classes-per-file
class ModalActions extends Component<JSX.HTMLAttributes> {
    public render() {
        return <footer {...this.props} class='mdc-dialog__actions'>
            {this.props.children}
        </footer>
    }
}

interface ButtonProps {
    action: 'yes' | 'no' | 'accept' | 'close'
    default?: boolean
    submit?: boolean
}
// tslint:disable-next-line:max-classes-per-file
class ModalButton extends Component<ButtonProps & JSX.HTMLAttributes> {
    public render() {
        return <button
            {...this.props}
            type={this.props.submit ? 'submit' : 'button'}
            class={'mdc-button mdc-dialog__button' + (this.props.default ? ' mdc-dialog__button--default' : '')}
            data-mdc-dialog-action={this.props.action}
        >
            {this.props.children}
        </button >
    }
}

interface State {
    content: JSX.Element
}
// tslint:disable-next-line:max-classes-per-file
export default class Modal extends Component<{}, State> {
    public static Surface = ModalSurface
    public static Title = ModalTitle
    public static Body = ModalBody
    public static Actions = ModalActions
    public static Button = ModalButton

    public dialogElement: HTMLElement

    public componentDidMount() {
        dialog = new MDCDialog(this.dialogElement) as any
        modal = this
    }

    public render() {
        return <div
            class='mdc-dialog'
            role='alertdialog'
            aria-modal='true'
            aria-labelledby='my-dialog-title'
            aria-describedby='my-dialog-content'
            ref={e => this.dialogElement = e}
        >
            <div class='mdc-dialog__container'>
                {this.state.content}
            </div>
            <div class='mdc-dialog__scrim' />
        </div>
    }

}

export async function OpenModal(jsx: JSX.Element) {
    return new Promise(resolve => {
        modal.setState({ content: jsx })
        dialog.open()
        dialog.listen('MDCDialog:closed', () => resolve())
    })
}

export function OpenYesNo(title: string, body: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        const yes = () => resolve(true)
        const no = () => resolve(false)
        dialog.listen('MDCDialog:closed', no)
        OpenModal(<Modal.Surface>
            <Modal.Title>
                {title}
            </Modal.Title>
            <Modal.Body>
                {body}
            </Modal.Body>
            <Modal.Actions>
                <Modal.Button action='no' onClick={no}>No</Modal.Button>
                <Modal.Button action='yes' onClick={yes}>Yes</Modal.Button>
            </Modal.Actions>
        </Modal.Surface>)
    })
}
