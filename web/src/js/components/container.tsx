
import * as s from 'css/container.scss'
import { FunctionalComponent, h } from 'preact'

interface Props {
    background?: boolean
}

export const Container: FunctionalComponent<Props> = props => {
    let classes = s.container
    if (props.background) {
        classes += ' ' + s.background
    }
    return <div class={classes}>
        {props.children}
    </div>
}
