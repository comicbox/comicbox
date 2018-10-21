import { gql } from 'js/graphql'
import Error from 'js/views/error'
import Home from 'js/views/home'
import SeriesIndex from 'js/views/series-index'
import { h, render } from 'preact'
import Router from 'preact-router'

import 'css/app.scss'
import SeriesView from 'js/views/series-view'
import { historyPush } from './history'

const jsx = <Router onChange={historyPush}>
    <Home path='/' />
    <SeriesIndex path='/series' />
    <SeriesView path='/series/:name/:page?' />
    <Error default={true} />
</Router>

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
