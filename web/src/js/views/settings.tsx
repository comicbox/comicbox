import autobind from 'autobind-decorator'
import * as s from 'css/settings.scss'
import { login, logout, user } from 'js/auth'
import { gql } from 'js/graphql'
import User from 'js/model/user'
import Options from 'js/options'
import url from 'js/url'
import Layout from 'js/views/layout'
import { Component, h } from 'preact'
import Btn from 'preact-material-components/Button'
import TextField from 'preact-material-components/TextField'
import { Link } from 'preact-router'

// interface Props {

// }

interface State {
    address: string

    me: User
    username: string
    name: string

    oldPass: string
    newPass: string
    repeatNewPass: string

    // Admin related vars
    newNameToAdd: string
    newUsernameToAdd: string
    newUserPasswordToAdd: string
    userToDelete: string
    userToMakeAdmin: string
    userToRevokeAdmin: string
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
        let adminSettings = null
        let name = ''
        let username = ''

        // Server settings
        if (location.protocol === 'file:') {
            serverSettings = <div>
                <h2>Server</h2>
                <TextField label='Address' value={this.state.address} onKeyUp={this.keyUpAddress} readOnly />
                <Btn raised class={s.button} onClick={this.btnAddress}>Update</Btn>
            </div>
        }
        // Admin Settings
        // TODO: Once user groups are implemented
        // change if statement to check if user is an admin, if so show admin settings
        if (true) {
            adminSettings = <div>
                <h2>Admin</h2>
                <h3>Add User</h3>
                <div>
                    <TextField label='Name' onKeyUp={this.keyUpNewNameToAdd} />
                </div>
                <div>
                    <TextField label='Username' onKeyUp={this.keyUpNewUsernameToAdd} />
                </div>
                <div>
                    <TextField label='Password' type='password' onKeyUp={this.keyUpNewUserPasswordToAdd} />
                    <Btn raised class={s.button} onClick={this.btnAddUser}>Add User</Btn>
                </div>
                <h3>Delete User</h3>
                <TextField label='Username To Delete' onKeyUp={this.keyUpDeleteUser} />
                <Btn raised class={s.button} onClick={this.btnDeleteUser}>Delete</Btn>
                <h3>Grant Admin Status</h3>
                <TextField label='Username To Make Admin' onKeyUp={this.keyUpAddAdminStatus} />
                <Btn raised class={s.button} onClick={this.btnGrantAdminStatus}>Grant</Btn>
                <h3>Revoke Admin Status</h3>
                <TextField label='Username To Revoke' onKeyUp={this.keyUpRemoveAdminStatus} />
                <Btn raised class={s.button} onClick={this.btnRevokeAdminStatus}>Revoke</Btn>
            </div>

        }

        if (this.state.me) {
            name = this.state.name
            username = this.state.username
        }
        return <Layout backLink='/'>
            <h1>Settings</h1>
            <div>
                <Btn raised onClick={this.btnScan}>Start Scan</Btn>
                <Btn raised class={s.button} onClick={this.btnLogout}>Logout</Btn>
            </div>
            <div>
                {serverSettings}
            </div>
            <div>
                <h3>User</h3>
                <div>
                    <TextField label='Name' value={name} onKeyUp={this.keyUpName} />
                </div>
                <div>
                    <TextField label='Username' value={username} onKeyUp={this.keyUpUsername} />
                    <Btn raised class={s.button} onClick={this.btnUpdateUser}>Update</Btn>
                </div>
                <h3>Change Password</h3>
                <div>
                    <TextField label='Old Password' type='password' onKeyUp={this.keyUpOldPassCheck} />
                </div>
                <div>
                    <TextField label='New Password' type='password' onKeyUp={this.keyUpNewPass} />
                </div>
                <TextField label='Repeat New Password' type='password' onKeyUp={this.keyUpRepeatNewPass} />
                <Btn raised class={s.button} onClick={this.btnUpdatePassword}>Update</Btn>
            </div>
            <div>
                {adminSettings}
            </div>
            <div>
                <Link href='/theme'><Btn>Edit Theme</Btn></Link>
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
    private keyUpNewNameToAdd(e: Event) {
        if (e.target instanceof HTMLInputElement) {
            this.setState({ newNameToAdd: e.target.value })
        }
    }

    @autobind
    private keyUpNewUsernameToAdd(e: Event) {
        if (e.target instanceof HTMLInputElement) {
            this.setState({ newUsernameToAdd: e.target.value })
        }
    }

    @autobind
    private keyUpNewUserPasswordToAdd(e: Event) {
        if (e.target instanceof HTMLInputElement) {
            this.setState({ newUserPasswordToAdd: e.target.value })
        }
    }

    @autobind
    private keyUpDeleteUser(e: Event) {
        if (e.target instanceof HTMLInputElement) {
            this.setState({ userToDelete: e.target.value })
        }
    }

    @autobind
    private keyUpAddAdminStatus(e: Event) {
        if (e.target instanceof HTMLInputElement) {
            this.setState({ userToMakeAdmin: e.target.value })
        }
    }

    @autobind
    private keyUpRemoveAdminStatus(e: Event) {
        if (e.target instanceof HTMLInputElement) {
            this.setState({ userToRevokeAdmin: e.target.value })
        }
    }

    @autobind
    private keyUpOldPassCheck(e: Event) {
        if (e.target instanceof HTMLInputElement) {
            this.setState({ oldPass: e.target.value })
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

        // TODO: Add check to match original old password with given old password for security
        if (this.state.newPass !== this.state.repeatNewPass) {
            alert("Your passwords don't match. Please try again.")
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

    @autobind
    private async btnScan() {
        const response = await fetch(await url('/api/scan'))
        if (!response.ok) {
            // TODO: something here
        }
    }

    // Adds a user to the database
    @autobind
    private async btnAddUser() {
        // Returns whats in the top block (id,name,username)
        const response = await gql(`
        user(user: $user) {
          id
          name
          username
        }
      `, {
                user: 'UserInput!',
            }, {
                user: {
                    name: this.state.newNameToAdd,
                    username: this.state.newUsernameToAdd,
                    password: this.state.newUserPasswordToAdd,
                },
            }, true)
    }

    @autobind
    private async btnDeleteUser() {
        // TODO: Add functionality to delete user from the database
    }

    @autobind
    private async btnGrantAdminStatus() {
        // TODO: Add granting admin status functionality once user groups are implemented
    }

    @autobind
    private async btnRevokeAdminStatus() {
        // TODO: Add revoking admin status functionality once user groups are implemented
    }
}
