import autobind from 'autobind-decorator'
import { login, logout, user } from 'js/auth'
import User from 'js/model/user'
import Options from 'js/options'
import Layout from 'js/views/layout'
import { Component, h } from 'preact'
import Btn from 'preact-material-components/Button'
import TextField from 'preact-material-components/TextField'

// interface Props {

// }

interface State {
    address: string

    me: User
    username: string
    name: string

    newPass: string
    repeatNewPass: string
}

export default class Settings extends Component<{}, State> {

    public componentDidMount() {
        // login('adam', 'test')
        user().then(me => {
            this.setState({
                me: me,
                username: me.username,
                name: me.name,
            })
        })
        Options.getOrigin().then(address => {
            this.setState({
                address: address,
            })
        })
    }

    public render() {
        let serverSettings = null
        let name = ''
        let username = ''

        if (location.protocol === 'file:') {
            serverSettings = <div>
                <h2>Server</h2>
                <TextField label='Address' value={this.state.address} onKeyUp={this.keyUpAddress} readOnly />
                <Btn raised onClick={this.btnAddress}>Change</Btn>
            </div>
        }

        if (this.state.me) {
            name = this.state.name
            username = this.state.username
        }
        return <Layout backLink='/'>
            <h1>Settings</h1>
            {serverSettings}
            <div>
                <h2>User</h2>
                <TextField label='Name' value={name} onKeyUp={this.keyUpName} />
                <TextField label='Username' value={username} onKeyUp={this.keyUpUsername} />
                <Btn raised onClick={this.btnUpdateUser}>Update</Btn>

                <Btn raised onClick={this.btnLogout}>Logout</Btn>

                <h3>Change Password</h3>
                <TextField label='New Password' type='password' onKeyUp={this.keyUpNewPass} />
                <TextField label='Repeat New Password' type='password' onKeyUp={this.keyUpRepeatNewPass} />
                <Btn raised onClick={this.btnUpdatePassword}>Update</Btn>

            </div>
        </Layout >
    }

    @autobind
    private keyUpAddress(e: Event) {
        if (e.target instanceof HTMLInputElement) {
            this.setState({ address: e.target.value })
        }
    }

    @autobind
    private keyUpUsername(e: Event) {
        if (e.target instanceof HTMLInputElement) {
            this.setState({ username: e.target.value })
        }
    }

    @autobind
    private keyUpName(e: Event) {
        if (e.target instanceof HTMLInputElement) {
            this.setState({ name: e.target.value })
        }
    }

    @autobind
    private keyUpNewPass(e: Event) {
        if (e.target instanceof HTMLInputElement) {
            this.setState({ newPass: e.target.value })
        }
    }

    @autobind
    private keyUpRepeatNewPass(e: Event) {
        if (e.target instanceof HTMLInputElement) {
            this.setState({ repeatNewPass: e.target.value })
        }
    }

    @autobind
    private async btnAddress() {
        const address = await Options.setOrigin()
        this.setState({
            address: address,
        })
    }

    @autobind
    private async btnUpdateUser() {
        const me = this.state.me

        me.name = this.state.name
        me.username = this.state.username

        await me.save()

        this.setState({
            me: me,
            username: me.username,
            name: me.name,
        })
    }

    @autobind
    private async btnUpdatePassword() {
        const me = this.state.me

        if (this.state.newPass !== this.state.repeatNewPass) {
            alert("your passwords don't match")
            return
        }

        me.password = this.state.newPass

        await me.save()

        this.setState({
            newPass: '',
            repeatNewPass: '',
        })
    }

    @autobind
    private btnLogout() {
        logout()
    }

}
