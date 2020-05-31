import { FunctionalComponent, h } from "preact";
import { Link } from "preact-router";
import styles from "./layout.module.scss";
import { IconName } from "./icon-type";
import { Icon } from "./icon";
import { routes } from "app";

interface MenuItem {
    title: string
    href: string
    icon: IconName
}

export const Layout: FunctionalComponent = props => {
    return <div class={styles.layout}>
        <SideBar />
        <main class={styles.content}>
            {props.children}
        </main>
    </div>
}

const SideBar: FunctionalComponent = props => {
    const items: MenuItem[] = [
        { title: 'Home', href: routes.home, icon: 'home' },
        { title: 'Search', href: routes.search, icon: 'search' },
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
            <li>
                <a href="/" title="v1">
                    <Icon class={styles.icon} name='exposure_neg_1' />
                    <div class={styles.title}>
                        V1
                    </div>
                </a>
            </li>
        </ul>
    </nav>
}
