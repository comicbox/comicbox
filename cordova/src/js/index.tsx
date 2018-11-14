import 'css/app.scss'
import createHashHistory from 'history/createHashHistory'
import Error from 'js/views/error'
import Home from 'js/views/home'
import SearchIndex from 'js/views/search-index'
import SeriesIndex from 'js/views/series-index'
import SeriesView from 'js/views/series-view'
import { h, render } from 'preact'
import Router from 'preact-router'

const jsx = <Router /*onChange={historyPush}*/ history={createHashHistory()}>
    <Home path='/' />
    <SeriesIndex path='/series' />
    <SeriesView path='/series/:name/:page?' />
    <Error default={true} />
    <SearchIndex path='/search/:query' />
</Router>

render(jsx, document.getElementById('app'))
