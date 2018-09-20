import {render, h} from 'preact';
import Router from 'preact-router';
import Home from 'js/views/home'
import Error from 'js/views/error';
import SeriesIndex from 'js/views/series-index';

import "css/app.scss"

render((
    <Router>
        <Home path="/"/>
        <SeriesIndex path="/series"/>
        <Error default />
    </Router>
), document.getElementById("app"));