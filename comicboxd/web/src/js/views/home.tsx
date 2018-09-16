import * as React from 'preact'
import Layout from 'js/views/layout'
import * as graphql from 'js/graphql'


import * as s from 'css/home.scss'
import BookList from 'js/components/book-list';

interface Props {

}

interface State {
    
}

export default class Home extends React.Component<Props, State> {

    componentDidMount(){
        
    }

    render(): React.ComponentChild {
        console.log(this.props);

        return <Layout>
            <BookList />
        </Layout>
    }

}