import { FunctionalComponent, h } from 'preact'
import Button from 'preact-material-components/Button'
import { Link } from 'preact-router'

const LoginPrompt: FunctionalComponent = props => <div>
    <h1>Guest</h1>
    <p>Login to keep track of reading progress and edit settings</p>
    <p><Link href='/login'><Button raised>Login</Button></Link></p>
</div>

export default LoginPrompt
