import { render, h } from 'preact'
import { init } from './db'

init()

render(<div>test</div>, document.getElementById('app')!)
