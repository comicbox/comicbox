import { bindValue } from '@zwzn/spicy'
import classNames from 'classnames'
import { Book } from 'db'
import { FunctionalComponent, h } from 'preact'
import styles from './reader-hud.module.scss'
import { Slider } from './slider'

export interface Props {
    open: boolean
    page: number
    book: Book
    sliderChange: (page: string) => void
}

export const ReaderHud: FunctionalComponent<Props> = props => (
    <div
        class={classNames(styles.hud, {
            [styles.open]: props.open,
        })}
    >
        <Slider
            value={props.page}
            max={props.book.pages.length}
            onChange={bindValue(props.sliderChange)}
        />
    </div>
)
