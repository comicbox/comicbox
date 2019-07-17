import 'css/app.scss'
import createHashHistory from 'history/createHashHistory'
import Modal from 'js/components/modal'
import Snack from 'js/components/snack'
import { historyPush } from 'js/history'
import Error from 'js/views/error'
import Home from 'js/views/home'
import List from 'js/views/list'
import Login from 'js/views/login'
import Read from 'js/views/read'
import SearchIndex from 'js/views/search-index'
import SeriesIndex from 'js/views/series-index'
import SeriesView from 'js/views/series-view'
import Settings from 'js/views/settings'
import Theme, { loadTheme } from 'js/views/theme'
import { h, render } from 'preact'
import Router from 'preact-router'
import { add } from './routes'

const jsx = <div>
    <Router onChange={historyPush} history={createHashHistory()}>
        <Home path={add('/', 'home')} />
        <SeriesIndex path={add('/series', 'series.index')} />
        <SeriesView path={add('/series/:name/:page?', 'series.view')} />
        <SearchIndex path={add('/search/:query', 'search.index')} />
        <Settings path={add('/settings', 'settings')} />
        <List path={add('/list', 'list.index')} />
        <Read path={add('/book/:id/:page?', 'book.read')} />
        <Theme path={add('/theme', 'theme')} />

        <Login path={add('/login', 'login')} />

        <Error default={true} />
    </Router>

    <Snack />
    <Modal />
</div>

loadTheme()

render(jsx, document.getElementById('app')!)
