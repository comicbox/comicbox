import { FunctionalComponent, h, JSX } from 'preact'
import { db, useQuery, Book, updateDatabase } from 'db'
import { pageImage, previousBook, nextBook } from 'components/book'
import { Layout } from 'components/layout'
import styles from './read.module.scss'
import { Link, route } from 'preact-router'
import { routeURL, routes } from 'app'
import { useCallback, useState } from 'preact/hooks'
import classNames from 'classnames'
import { Slider } from 'components/slider'
import { bindValue } from '@zwzn/spicy'
import { run, prepare } from 'db/graphql'

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
        id => db.books.where('id').equals(id).first(),
        [props.matches.id]
    )

    const screenClick = useCallback(() => setMenuOpen(false), [])

    const pageClick = useCallback(async (e: MouseEvent) => {
        const section = Math.floor(e.x / window.innerWidth * 3)
        switch (section) {
            case 0:
                changePage(book.result, page - 1)
                return
            case 1:
                setMenuOpen(true)
                return
            case 2:
                changePage(book.result, page + 1)
                return
        }
    }, [props.matches.id, page, book.result])

    const sliderChange = useCallback((page: string) => {
        route(routeURL(routes.books.view, { id: props.matches.id, page: page }))
    }, [])

    if (book.result === undefined) {
        return <div>
            loading
        </div>
    }

    return <Layout>
        <div
            class={classNames(styles.read, {
                [styles.menuOpen]: menuOpen,
            })}
        >
            <div class={styles.hud}>
                <Slider value={page} max={book.result.pages.length} onChange={bindValue(sliderChange)} />
            </div>
            <div class={styles.screen} onClick={screenClick} />
            <div class={styles.pages} onClick={pageClick}>
                <img class={styles.page} src={pageImage(book.result, page)} alt="" />
            </div>
        </div>
    </Layout>
}

async function changePage(book: Book | undefined, page: number) {
    if (book === undefined) {
        return
    }
    if (page < 0) {
        const pBook = await previousBook(book)
        if (pBook !== undefined) {
            route(routeURL(routes.books.view, { id: pBook.id, page: pBook.current_page }))
        } else {
            route(routeURL(routes.home, {}))
        }
        return
    }
    if (page > book.pages.length - 1) {
        const nBook = await nextBook(book)
        if (nBook !== undefined) {
            route(routeURL(routes.books.view, { id: nBook.id, page: nBook.current_page }))
        } else {
            route(routeURL(routes.home, {}))
        }
        return
    }
    route(routeURL(routes.books.view, { id: book.id, page: page }))
    await saveProgress(book, page)
}

async function saveProgress(book: Book, page: number) {
    await run(prepare('mutation', {},
        prepare('update_book', {
            id: book.id, data: { current_page: page }
        },
            'id',
            'change'
        )
    ))
    await updateDatabase()
}