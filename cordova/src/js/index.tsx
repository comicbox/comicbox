import 'css/app.scss'
import createHashHistory from 'history/createHashHistory'
import { historyPush } from 'js/history'
import Error from 'js/views/error'
import Home from 'js/views/home'
import List from 'js/views/list'
import SearchIndex from 'js/views/search-index'
import SeriesIndex from 'js/views/series-index'
import SeriesView from 'js/views/series-view'
import Settings from 'js/views/settings'
import { h, render } from 'preact'
import Router from 'preact-router'

const jsx = <Router onChange={historyPush} history={createHashHistory()}>
    <Home path='/' />
    <SeriesIndex path='/series' />
    <SeriesView path='/series/:name/:page?' />
    <SearchIndex path='/search/:query' />
    <Settings path='/settings' />
    <List path='/list' />

    <Error default={true} />
</Router>

render(jsx, document.getElementById('app'))
