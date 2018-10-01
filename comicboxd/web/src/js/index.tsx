import { render, h } from 'preact';
import Router from 'preact-router';
import Home from 'js/views/home'
import Error from 'js/views/error';
import SeriesIndex from 'js/views/series-index';
import { Exec } from 'js/graphql'

import "css/app.scss"

(async () => {

    let data = await fetch("/login", {
        method: "POST",
        body: JSON.stringify({
            username: "adam",
            password: "test"
        })
    }).then(r => r.json())

    console.log(data)

    let me = await Exec(`{
        me {
            id
        }
    }`)

    console.log(me.data.me)
})()

render((
    <Router>
        <Home path="/" />
        <SeriesIndex path="/series" />
        <Error default />
    </Router>
), document.getElementById("app"));