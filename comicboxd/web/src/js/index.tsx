import { render, h } from 'preact';
import Router from 'preact-router';
import Home from 'js/views/home'
import Error from 'js/views/error';
import SeriesIndex from 'js/views/series-index';
import { query } from 'js/graphql'

import "css/app.scss"
import SeriesView from 'js/views/series-view';
import { historyPush } from './history';

const jsx = <Router onChange={historyPush}>
    <Home path="/" />
    <SeriesIndex path="/series" />
    <SeriesView path="/series/:name/:page?" />
    <Error default />
</Router>

query(`me { id }`).catch(async err => {
    let data = await fetch("/login", {
        method: "POST",
        body: JSON.stringify({
            username: "adam",
            password: "test"
        })
    }).then(r => r.json())

    console.log("login:", data)

    render(jsx, document.getElementById("app"));
})


render(jsx, document.getElementById("app"));

