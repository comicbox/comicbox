import createHashHistory from 'history/createHashHistory'
import { gql } from 'js/graphql'
import Error from 'js/views/error'
import Home from 'js/views/home'
import SeriesIndex from 'js/views/series-index'
import { h, render } from 'preact'
import Router from 'preact-router'

import 'css/app.scss'
import SeriesView from 'js/views/series-view'
import { historyPush } from './history'
import Book from './model/book'

const jsx = <Router /*onChange={historyPush}*/ history={createHashHistory()}>
    <Home path='/' />
    <SeriesIndex path='/series' />
    <SeriesView path='/series/:name/:page?' />
    <Error default={true} />
</Router>

Book.find('8cdc6f18-e2c8-4015-b1c6-c9e9aa997482').then(console.log)

Book.
    where('series', '~=', 'story').
    where('chapter', '>', '10').
    take(2).skip(2).
    get().then(books => books.forEach(b => console.log(b)))

gql(`me { id }`).catch(async err => {
    const data = await fetch('/login', {
        method: 'POST',
        body: JSON.stringify({
            username: 'adam',
            password: 'test',
        }),
    }).then(r => r.json())

    render(jsx, document.getElementById('app'))
})

render(jsx, document.getElementById('app'))
