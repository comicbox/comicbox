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

const jsx = <div>
    <Router onChange={historyPush} history={createHashHistory()}>
        <Home path='/' />
        <SeriesIndex path='/series' />
        <SeriesView path='/series/:name/:page?' />
        <SearchIndex path='/search/:query' />
        <Settings path='/settings' />
        <List path='/list' />
        <Read path='/book/:id/:page?' />
        <Theme path='/theme' />

        <Login path='/login' />

        <Error default={true} />
    </Router>

    <Snack />
    <Modal />
</div>

loadTheme()

render(jsx, document.getElementById('app'))
