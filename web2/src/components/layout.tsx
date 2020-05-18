import { FunctionalComponent, h } from "preact";
import { Link } from "preact-router";
import styles from "./layout.module.scss";
import { IconName } from "./icon-type";
import { Icon } from "./icon";
import { routes } from "app";
import { useState, useEffect } from "preact/hooks";
import { bindValue } from '@zwzn/spicy'
import { db, Series } from "db";

interface MenuItem {
    title: string
    href: string
    icon: IconName
}

export const Layout: FunctionalComponent = props => {
    return <div class={styles.layout}>
        <Search />
        <SideBar />
        <main class={styles.content}>
            {props.children}
        </main>
    </div>
}

const SideBar: FunctionalComponent = props => {
    const items: MenuItem[] = [
        { title: 'Home', href: routes.home, icon: 'home' },
        { title: 'List', href: routes.list, icon: 'view_list' },
        { title: 'Series', href: routes.series.index, icon: 'collections_bookmark' },
        // { title: 'Settings', href: routes.settings, icon: 'settings' },
    ]
    return <nav class={styles.nav}>
        <ul>
            {items.map(item => (
                <li>
                    <Link href={item.href} title={item.title}>
                        <Icon class={styles.icon} name={item.icon} />
                        <div class={styles.title}>
                            {item.title}
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
    </nav>
}

const Search: FunctionalComponent = props => {
    const [search, setSearch] = useState('')
    const [results, setResults] = useState<Series[]>([])
    useEffect(() => {
        db.series
            .where('search').startsWithAnyOfIgnoreCase(search.split(' '))
            .limit(10)
            .distinct()
            .toArray()
            .then(series => setResults(series))
    }, [search])

    return <div>
        <input value={search} onInput={bindValue(setSearch)} />
        <ul>
            {results.map(series => <li key={series.name}>
                {series.name}
            </li>)}
        </ul>
    </div>
}