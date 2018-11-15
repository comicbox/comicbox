import { gql } from 'js/graphql'
import User from 'js/model/user'
import Layout from 'js/views/layout'
import { Component, h } from 'preact'
import TextField from 'preact-material-components/TextField'
import 'preact-material-components/TextField/style.css'

const query = `
me {
    id
    name
    username
}
`

export default class Settings extends Component<any, { me: User }> {
    public async componentDidMount() {
        const me = await gql(query)
        this.setState({ me: me })
    }

    public render() {
        let serverSettings = null
        let name = ''
        let user = ''

        if (location.protocol === 'file:' || true) {
            serverSettings = <div>
                <h2>Server</h2>
                <TextField label='Address' value={localStorage.getItem('origin')} />
            </div>
        }

        if (this.state.me) {
            name = this.state.me.name
            user = this.state.me.username
        }
        return <Layout backLink='/'>
            <h1>Settings</h1>
            {serverSettings}
            <div>
                <h2>User</h2>
                <TextField label='Name' value={name} />
                <TextField label='Username' value={user} />

                <TextField label='Current Password' type='password' />
                <TextField label='New Password' type='password' />
                <TextField label='Repeat New Password' type='password' />
            </div>
        </Layout >
    }

}
