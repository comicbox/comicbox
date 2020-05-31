import { render, h } from 'preact'
import { updateDatabase } from './db'
import { Home } from './views/home'
import { Router, Route } from 'preact-router'
import { SeriesIndex } from 'views/series-index'
import { SeriesView } from 'views/series-view'
import { ListIndex } from 'views/list'
import 'app.scss'
import { SearchIndex } from 'views/search'
import { BookRead } from 'views/read'

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

export function routeURL(url: string, args: { [P in string]?: string | number }) {
    return url.replace(/:([^\/]*)/g, (match, key) => {
        return encodeURIComponent(args[key] ?? key)
    })
}

render(<Router>
    <Route component={Home} path={routes.home} />
    <Route component={SeriesIndex} path={routes.series.index} />
    <Route component={SeriesView} path={routes.series.view} />
    <Route component={ListIndex} path={routes.list} />
    <Route component={SearchIndex} path={routes.search} />
    <Route component={BookRead} path={routes.books.view} />
</Router>, document.getElementById('app')!)
