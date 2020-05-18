import { render, h } from 'preact'
import { init } from './db'
import { Home } from './views/home'
import { Router } from 'preact-router'
import { SeriesIndex } from 'views/series-index'
import 'app.scss'

init()

export const routes = {
    home: '/v2',
    series: {
        index: '/v2/series'
    }
}

render(<Router>
    <Home path={routes.home} />
    <SeriesIndex path={routes.series.index} />
</Router>, document.getElementById('app')!)
