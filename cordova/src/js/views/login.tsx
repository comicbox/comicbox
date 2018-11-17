import autobind from 'autobind-decorator'
import { login } from 'js/auth'
import { Component, h } from 'preact'
import Btn from 'preact-material-components/Button'
import TextField from 'preact-material-components/TextField'
import { route } from 'preact-router'

export default class Login extends Component {

    private username: string
    private password: string

    public render() {
        return <div>
            <h1>Login</h1>
            <form onSubmit={this.btnLogin}>
                <TextField label='username' onKeyUp={this.keyUpUsername} />
                <TextField label='password' type='password' onKeyUp={this.keyUpPassword} />
                <Btn raised type='submit'>Login</Btn>
            </form>
        </div >
    }

    @autobind
    private keyUpUsername(e: Event) {
        if (e.target instanceof HTMLInputElement) {
            this.username = e.target.value
        }
    }

    @autobind
    private keyUpPassword(e: Event) {
        if (e.target instanceof HTMLInputElement) {
            this.password = e.target.value
        }
    }

    @autobind
    private async btnLogin(e: Event) {
        e.preventDefault()

        const me = await login(this.username, this.password)
        if (me === null) {
            alert('Invalid username or password')
            return
        }
        route('/')
    }

}
