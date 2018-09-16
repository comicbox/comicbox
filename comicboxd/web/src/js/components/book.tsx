import * as React from 'preact'

import * as s from 'css/book.scss'
import { Link } from 'preact-router';

interface Props {
    data: any
}
    
interface State {
}

export default class Book extends React.Component<Props, State> {

    componentDidMount() {
    }

    render(): React.ComponentChild {
        let book = this.props.data
        let image =  ""

        if (book.pages[0]) {
            image = "https://comicbox.ca/" + book.pages[0].url
        }

        return <div className={s.book} data-id={book.id}>
            <Link href={`/book/${book.id}`}>
                <div className={s.cover} style={{ backgroundImage: `url(${image})` }}></div>
                <div className={s.series} title={book.series}>{book.series}</div>
                <div className={s.title} title={book.title}>{book.title}</div>
            </Link>
        </div>
    }

}