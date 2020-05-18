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
        { title: 'Series', href: '/v2/list', icon: 'view_list' },
        { title: 'Series', href: routes.series.index, icon: 'collections_bookmark' },
        { title: 'Settings', href: '/v2/settings', icon: 'settings' },
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