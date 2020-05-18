import { FunctionalComponent, h } from 'preact'
import styles from './card.module.scss'
import { LazyImage } from './lazy-image'

type CardProps = {
    image: string
    title: string
    subtitle?: string
    link: string
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
    return <div class={styles.card}>
        <a href={props.link}>
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