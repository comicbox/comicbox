import 'css/app.scss'
import createHashHistory from 'history/createHashHistory'
import Error from 'js/views/error'
import Home from 'js/views/home'
import SeriesIndex from 'js/views/series-index'
import SeriesView from 'js/views/series-view'
import { h, render } from 'preact'
import Router from 'preact-router'
import { getDirectory } from './plugins/file'

const jsx = <Router /*onChange={historyPush}*/ history={createHashHistory()}>
    <Home path='/' />
    <SeriesIndex path='/series' />
    <SeriesView path='/series/:name/:page?' />
    <Error default={true} />
</Router>

// getDirectory('/').then(async (dir) => {

//     const entries = dir.readEntriesRecursive()

//     for await (const e of entries) {
//         console.log(e.fullpath)
//     }
// })
render(jsx, document.getElementById('app'))
