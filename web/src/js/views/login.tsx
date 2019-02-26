import autobind from 'autobind-decorator'
import * as s from 'css/login.scss'
import { login } from 'js/auth'
import Form from 'js/components/form'
import Book from 'js/model/book'
import { Component, h } from 'preact'
import Btn from 'preact-material-components/Button'
import TextField from 'preact-material-components/TextField'
import { route } from 'preact-router'
import Layout from './layout'

interface State {
    guestMode: boolean
}

export default class Login extends Component<{}, State> {

    constructor(props: {}) {
        super(props)

        this.state = {
            guestMode: false,
        }

        Book.take(0).get()
            .then(() => this.setState({ guestMode: true }))
            .catch(() => this.setState({ guestMode: false }))

    }

    public render() {
        const content = <div class={s.form + ' ' + (this.state.guestMode ? s.guestMode : '')}>
            <h1>Login</h1>
            <Form submit={this.login}>

                <TextField
                    class={s.username}
                    label='username'
                    name='user'
                />
                <TextField
                    class={s.password}
                    label='password'
                    type='password'
                    name='pass'
                />
                <Btn raised type='submit' class={s.login}>Login</Btn>
            </Form>
        </div >

        if (this.state.guestMode) {
            return <Layout backLink='/' breadcrumbs={[]}>
                {content}
            </Layout>
        }
        return content

    }

    @autobind
    private async login(data: { user: string, pass: string }) {

        const me = await login(data.user, data.pass)
        if (me === null) {
            alert('Invalid username or password')
            return
        }
        route('/')
    }
}
