import 'css/app.scss'
import createHashHistory from 'history/createHashHistory'
import { historyPush } from 'js/history'
import Error from 'js/views/error'
import Home from 'js/views/home'
import List from 'js/views/list'
import Login from 'js/views/login'
import SearchIndex from 'js/views/search-index'
import SeriesIndex from 'js/views/series-index'
import SeriesView from 'js/views/series-view'
import Settings from 'js/views/settings'
import { h, render } from 'preact'
import Snackbar from 'preact-material-components/Snackbar'
import Router from 'preact-router'

let bar: Snackbar

const jsx = <div>
    <Router onChange={historyPush} history={createHashHistory()}>
        <Home path='/' />
        <SeriesIndex path='/series' />
        <SeriesView path='/series/:name/:page?' />
        <SearchIndex path='/search/:query' />
        <Settings path='/settings' />
        <List path='/list' />

        <Login path='/login' />

        <Error default={true} />
    </Router>
    <Snackbar ref={e => { bar = e }} />
</div>

render(jsx, document.getElementById('app'))

const ws = new WebSocket('ws://localhost:8080/push')
ws.onmessage = e => {
    const data = JSON.parse(e.data)

    if ('message' in data) {
        bar.MDComponent.show({
            message: data.message,
        })
    }

}
