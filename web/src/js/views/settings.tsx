import autobind from 'autobind-decorator'
import * as s from 'css/settings.scss'
import auth from 'js/auth'
import { Container } from 'js/components/container'
import LoginPrompt from 'js/components/loginPrompt'
import { OpenForm, OpenYesNo } from 'js/components/modal'
import { gql } from 'js/graphql'
import User from 'js/model/user'
import route from 'js/routes'
import url from 'js/url'
import Layout from 'js/views/layout'
import { Component, FunctionalComponent, h } from 'preact'
import Button from 'preact-material-components/Button'
import TextField from 'preact-material-components/TextField'
import { Link } from 'preact-router'

/**
 * Things settings will do.
 * x Change current user's name, username and password
 * x logout
 * x start scan
 * - admin stuff
 *   x add users
 *   - delete users
 *   - change user roles
 * - change things from the config file?
 *   - book folder
 */

const Row: FunctionalComponent<{ title: string }> = (props) => (
    <div class={s.row}>
        <div class={s.title}>{props.title}</div>
        <div class={s.action}>{props.children}</div>
    </div>
)

interface State {
    me: User
}

export default class Settings extends Component<{}, State> {
    constructor(props: {}) {
        super(props)
        auth.user().then((me) => this.setState({ me: me }))
    }

    public render() {
        if (this.state.me && this.state.me.guest()) {
            return (
                <Layout back={route('home')} breadcrumbs={[]}>
                    <Container>
                        <LoginPrompt />
                    </Container>
                </Layout>
            )
        }
        let name = ''
        if (this.state.me) {
            name = this.state.me.name
        }
        return (
            <Layout back={route('home')} breadcrumbs={[]}>
                <Container>
                    <h2>General</h2>
                    <p>Hello {name}</p>
                </Container>
                <Container>
                    <h2>General</h2>
                </Container>
                <Container background>
                    <Row title="Scan">
                        <Button onClick={this.btnScan}>Run</Button>
                    </Row>
                    <Row title="User">
                        <Button onClick={this.btnUpdateUser}>Update</Button>
                        <Button onClick={this.btnLogout}>Logout</Button>
                    </Row>
                    <Row title="Password">
                        <Button onClick={this.btnUpdatePassword}>Update</Button>
                    </Row>
                    <Row title="Anilist">
                        <Button onClick={this.btnAnilistLogin}>Login</Button>
                    </Row>
                </Container>
                <Container>
                    <h2>Admin</h2>
                </Container>
                <Container background>
                    <Row title="Users">
                        <Button onClick={this.btnAddUser}>Add</Button>
                        <Button onClick={this.btnDeleteUser}>Delete</Button>
                    </Row>
                    <Row title="Groups">
                        <Button onClick={this.btnManageGroups}>Manage</Button>
                    </Row>
                </Container>
            </Layout>
        )
    }

    @autobind
    private async btnUpdateUser() {
        interface Response {
            username: string
            name: string
        }
        const me = await auth.user()
        const data: Response | undefined = await OpenForm(
            { title: 'Update User' },
            <div class={s.popup}>
                <TextField label="Name" value={me.name} name="name" />
                <TextField
                    label="Username"
                    value={me.username}
                    name="username"
                />
            </div>,
        )

        if (data === undefined) {
            return
        }

        me.name = data.name
        me.username = data.username

        await me.save()

        this.setState({ me: me })
    }

    @autobind
    private async btnUpdatePassword() {
        interface Response {
            current_pass: string
            new_pass_1: string
            new_pass_2: string
        }

        const me = await auth.user()
        const validate = async (resp: Response) => {
            if (resp.new_pass_1 !== resp.new_pass_2) {
                alert("Your passwords don't match. Please try again.")
                return false
            }
            // TODO: Add check to match original old password with given old password for security, but dont do it front
            // end like I did
            const u = await auth.login(me.username, resp.current_pass)
            if (u === null) {
                alert('Your password current password is incorrect')
                return false
            }
            return true
        }

        const data: Response | undefined = await OpenForm(
            {
                title: 'Change Password',
                validate: validate,
            },
            <div class={s.popup}>
                <TextField
                    label="Current Password"
                    type="password"
                    name="current_pass"
                    value=""
                    required
                />
                <TextField
                    label="New Password"
                    type="password"
                    name="new_pass_1"
                    value=""
                    required
                />
                <TextField
                    label="Repeat New Password"
                    type="password"
                    name="new_pass_2"
                    value=""
                    required
                />
            </div>,
        )

        if (data === undefined) {
            return
        }

        me.password = data.new_pass_1

        await me.save()
    }

    @autobind
    private async btnAnilistLogin() {
        const clientID = 4074
        window.open(
            `https://anilist.co/api/v2/oauth/authorize?client_id=${clientID}&response_type=token`,
            '_blank',
            'location=yes,height=570,width=520,scrollbars=yes,status=yes',
        )

        const data: { token: string } | undefined = await OpenForm(
            {
                title: 'Add Token',
                // validate: validate,
            },
            <div class={s.popup}>
                <TextField
                    label="Token"
                    type="text"
                    name="token"
                    value=""
                    required
                />
            </div>,
        )
        const me = await auth.user()
        me.anilist_token = data!.token
        me.save()
    }

    @autobind
    private btnLogout() {
        auth.logout()
    }

    @autobind
    private async btnScan() {
        const run = await OpenYesNo('Are you sure you want to run a scan?')
        if (!run) {
            return
        }
        const response = await fetch(await url('/api/scan'))
        if (!response.ok) {
            // TODO: something here
        }
    }

    // Adds a user to the database
    @autobind
    private async btnAddUser() {
        interface Response {
            name: string
            username: string
            password: string
        }
        const data: Response | undefined = await OpenForm(
            { title: 'New User' },
            <div class={s.popup}>
                <TextField label="Name" name="name" />
                <TextField label="Username" name="username" />
                <TextField label="Password" type="password" name="password" />
            </div>,
        )

        if (data === undefined) {
            return
        }
        // Returns whats in the top block (id,name,username)
        const response = await gql(
            `
            new_user(data: $user) {
                id
                name
                username
            }`,
            {
                user: 'UserInput!',
            },
            {
                user: {
                    name: data.name,
                    username: data.username,
                    password: data.password,
                },
            },
            true,
        )
    }

    @autobind
    private async btnDeleteUser() {
        // TODO: Add functionality to delete user from the database
    }

    @autobind
    private async btnManageGroups() {
        // TODO: Add granting admin status functionality once user groups are implemented
    }
}
