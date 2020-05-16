import { FunctionalComponent, h } from 'preact'
import styles from './card.module.scss'

interface CardProps {
    image: string
    title: string
    subtitle: string
    link: string
}

export const Card: FunctionalComponent<CardProps> = props => {
    return <div class={styles.card}>
        <a href={props.link}>
            <img class={styles.image} src={props.image} />
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