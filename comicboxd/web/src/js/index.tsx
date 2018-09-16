import * as React from 'preact';
import Router from 'preact-router';
import Home from 'js/views/home'
import Error from 'js/views/error';

import "css/app.scss"

React.render((
    <Router>
        <Home path="/" />
        <Error default />
    </Router>
), document.getElementById("app"));