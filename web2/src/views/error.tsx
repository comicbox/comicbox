import { Layout } from 'components/layout'
import { FunctionalComponent, h } from 'preact'

export interface ErrorProps {
    message: string
}

export const ErrorPage: FunctionalComponent<ErrorProps> = props => {
    return (
        <Layout>
            <h1>{props.message}</h1>
        </Layout>
    )
}

export const Error404: FunctionalComponent = () => {
    return <ErrorPage message='404 Not Found' />
}
