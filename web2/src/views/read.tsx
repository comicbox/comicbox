import { FunctionalComponent, h } from 'preact'
import { db, useQuery } from 'db'
import { pageImage } from 'components/book'
import { Layout } from 'components/layout'
import styles from './read.module.scss'
import { Link, route } from 'preact-router'
import { routeURL, routes } from 'app'
import { useCallback, useState } from 'preact/hooks'
import classNames from 'classnames'

interface Props {
    matches: {
        id: string
        page: string
    }
}

export const BookRead: FunctionalComponent<Props> = props => {
    const page = Number(props.matches.page)

    const [menuOpen, setMenuOpen] = useState(false)

    const book = useQuery(
        () => db.books.where('id').equals(props.matches.id).first(),
        [],
        [props.matches.id]
    )

    const screenClick = useCallback(() => setMenuOpen(false), [])

    const click = useCallback((e: MouseEvent) => {
        if (e.target instanceof HTMLElement) {
            const rect = e.target.getBoundingClientRect()
            const section = Math.floor((e.x - rect.x) / rect.width * 3)
            switch (section) {
                case 0:
                    route(routeURL(routes.books.view, { id: props.matches.id, page: page - 1 }))
                    return
                case 1:
                    setMenuOpen(true)
                    return
                case 2:
                    route(routeURL(routes.books.view, { id: props.matches.id, page: page + 1 }))
                    return
            }
        }
    }, [props.matches.id, page])

    if (book.result === undefined) {
        return <div>
            loading
        </div>
    }

    return <Layout>
        <div class={classNames(styles.read, { [styles.menuOpen]: menuOpen })}>
            <div class={styles.hud}>
                <input class={styles.page} type="range" max={book.result.pages.length} value={page} />
            </div>
            <div class={styles.screen} onClick={screenClick} />
            <img class={(styles.image)} onClick={click} src={pageImage(book.result, page)} alt="" />
        </div>
    </Layout>
}
