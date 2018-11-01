import 'css/app.scss'
import createHashHistory from 'history/createHashHistory'
import Error from 'js/views/error'
import Home from 'js/views/home'
import SeriesIndex from 'js/views/series-index'
import SeriesView from 'js/views/series-view'
import { h, render } from 'preact'
import Router from 'preact-router'
// import { getFS, readFile, writeFile, getFile } from './plugins/file'

const jsx = <Router /*onChange={historyPush}*/ history={createHashHistory()}>
    <Home path='/' />
    <SeriesIndex path='/series' />
    <SeriesView path='/series/:name/:page?' />
    <Error default={true} />
</Router>

// if ('serviceWorker' in navigator) {
//     // Use the window load event to keep the page load performant
//     window.addEventListener('load', () => {
//         navigator.serviceWorker.register('./sw.js')
//     })
// }

// (async () => {
//     console.log(await getFS())
//     console.log(await writeFile('/a/path/to/a/file.txt', 'content'))
//     console.log(await getFile('/a/path/to/a/file.txt'))
//     console.log(await readFile('/a/path/to/a/file.txt'))
// })()

render(jsx, document.getElementById('app'))
