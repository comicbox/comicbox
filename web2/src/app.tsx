import 'app.scss'
import { h, render } from 'preact'
import { Route, Router } from 'preact-router'
import { ListIndex } from 'views/list'
import { BookRead } from 'views/read'
import { SearchIndex } from 'views/search'
import { SeriesIndex } from 'views/series-index'
import { SeriesView } from 'views/series-view'
import { Settings } from 'views/settings'
import { updateDatabase } from './db'
import { Home } from './views/home'

updateDatabase()

export const routes = {
    home: '/v2',
    list: '/v2/list',
    search: '/v2/search',
    settings: '/v2/settings',
    series: {
        index: '/v2/series',
        view: '/v2/series/:name',
    },
    books: {
        view: '/v2/books/:id/page/:page',
    },
}

export function routeURL(
    url: string,
    args: { [P in string]?: string | number },
) {
    return url.replace(/:([^\/]*)/g, (match, key) => {
        return encodeURIComponent(args[key] ?? key)
    })
}

render(
    <Router>
        <Route component={Home} path={routes.home} />
        <Route component={SeriesIndex} path={routes.series.index} />
        <Route component={SeriesView} path={routes.series.view} />
        <Route component={ListIndex} path={routes.list} />
        <Route component={SearchIndex} path={routes.search} />
        <Route component={BookRead} path={routes.books.view} />
        <Route component={Settings} path={routes.settings} />
    </Router>,
    document.getElementById('app')!,
)
