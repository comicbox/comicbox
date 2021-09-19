import { Layout } from 'components/layout'
import { refreshDatabase } from 'db'
import { FunctionalComponent, h } from 'preact'

export const Settings: FunctionalComponent = () => {
    return (
        <Layout>
            <h1>Settings</h1>
            <button onClick={refreshDatabase}>Refresh Local Database</button>
        </Layout>
    )
}
