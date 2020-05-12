import { render, h } from 'preact'
import { init } from './db'
import { Home } from './views/home'

init()

render(<Home />, document.getElementById('app')!)
