import { FunctionalComponent, h } from "preact";
import styles from "./slider.module.scss";

interface Props {
    max: number
    value: number
    onChange?: (e: Event) => void
}

export const Slider: FunctionalComponent<Props> = props => {
    return <input
        class={styles.slider}
        type="range"
        max={props.max}
        value={props.value}
        onInput={props.onChange}
    />
}