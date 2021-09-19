import { FunctionalComponent, h } from 'preact'
import styles from './slider.module.scss'

interface Props {
    max: number
    value: number
    onChange?: (e: Event) => void
}

export const Slider: FunctionalComponent<Props> = props => {
    return (
        <label class={styles.slider}>
            <input
                class={styles.input}
                type='range'
                max={props.max}
                value={props.value}
                onInput={props.onChange}
            />
            <div class={styles.value}>
                {props.value}/{props.max}
            </div>
        </label>
    )
}
