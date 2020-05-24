import { FunctionalComponent, h, JSX } from 'preact'
import styles from './card.module.scss'
import { LazyImage } from './lazy-image'
import * as classNames from 'classnames'

type CardProps = {
    image: string
    title: string
    subtitle?: string
    link: string
    unread: number | boolean
    loading?: false
} | {
    loading: true
}

export const Card: FunctionalComponent<CardProps> = props => {
    if (props.loading) {
        return <div class={styles.card}>
            <div class={styles.image} />
        </div>
    }

    let unread: JSX.Element | undefined

    if (typeof props.unread === 'number' && props.unread > 0) {
        unread = <div class={styles.unread}>{props.unread}</div>
    }

    if (typeof props.unread === 'boolean' && props.unread) {
        unread = <div class={styles.unread}></div>
    }

    return <div class={styles.card}>
        <a href={props.link}>
            {unread}
            <LazyImage class={styles.image} src={props.image} />
            <div class={styles.titles}>
                <div class={styles.title}>{props.title}</div>
                <div class={styles.subtitle}>{props.subtitle}</div>
            </div>
        </a>
    </div>
}

export const CardList: FunctionalComponent = props => {
    return <div class={styles.cardList}>
        {props.children}
    </div>
}