import { render, h } from 'preact'
import { init } from './db'
import { Home } from './views/home'
import { Router, Route } from 'preact-router'
import { SeriesIndex } from 'views/series-index'
import { SeriesView } from 'views/series-view'
import { ListIndex } from 'views/list'
import 'app.scss'
import { SearchIndex } from 'views/search'

init()

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
        view: '/v2/books/:id',
    },
}

export function routeURL(url: string, args: { [P in string]: string }) {
    return url.replace(/:([^\/]*)/g, (match, key) => {
        return encodeURIComponent(args[key])
    })
}

render(<Router>
    <Route component={Home} path={routes.home} />
    <Route component={SeriesIndex} path={routes.series.index} />
    <Route component={SeriesView} path={routes.series.view} />
    <Route component={ListIndex} path={routes.list} />
    <Route component={SearchIndex} path={routes.search} />
</Router>, document.getElementById('app')!)
