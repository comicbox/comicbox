import { Event, EventTarget } from 'event-target-shim'
import { FunctionalComponent, h, JSX } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import styles from './modal.module.scss'

type ModalEventMap = {
    open: OpenModalEvent
    close: CloseModalEvent
}

class OpenModalEvent extends Event<'open'> {
    constructor(public id: number, public content: JSX.Element) {
        super('open')
    }
}

class CloseModalEvent extends Event<'close'> {
    constructor(public id: number) {
        super('close')
    }
}

const modalTarget = new EventTarget<ModalEventMap, 'strict'>()
let modalID = 0

export const ModalHost: FunctionalComponent = () => {
    const [modals, setModals] = useState(new Map<number, ModalProps>())

    useEffect(() => {
        const openListener = (e: OpenModalEvent) => {
            setModals(m => m.set(e.id, { content: e.content }))
        }
        modalTarget.addEventListener('open', openListener)

        const closeListener = (e: CloseModalEvent) => {}
        modalTarget.addEventListener('close', closeListener)
        return () => {
            modalTarget.removeEventListener('open', openListener)
            modalTarget.removeEventListener('close', closeListener)
        }
    }, [setModals])
    return <div></div>
}

export interface ModalProps {
    content: JSX.Element
}

export const Modal: FunctionalComponent<ModalProps> = props => {
    return <div class={styles.modal}>{props.children}</div>
}

interface ModalResponse {
    promise: Promise<void>
    close(): void
}

export function openModal(content: JSX.Element): ModalResponse {
    const id = modalID++
    modalTarget.dispatchEvent(new OpenModalEvent(id, content))

    return {
        close() {
            modalTarget.dispatchEvent(new CloseModalEvent(id))
        },
        promise: new Promise(resolve => {
            resolve()
        }),
    }
}

openModal(<div>test</div>)
