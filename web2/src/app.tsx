import { render, h } from 'preact'
import { init } from './db'
import { Home } from './views/home'
import { Router, Route } from 'preact-router'
import 'app.scss'

init()

export const routes = {
    home: 'v2'
}

render(<Router>
    <Home path={routes.home} />
</Router>, document.getElementById('app')!)
