import { FunctionalComponent, h } from 'preact'
import { db, useQuery } from 'db'
import { pageImage } from 'components/book'

interface Props {
    matches: {
        id: string
        page?: string
    }
}

export const BookRead: FunctionalComponent<Props> = props => {
    const book = useQuery(
        () => db.books.where('id').equals(props.matches.id).first(),
        [],
        [props.matches.id]
    )

    if (book.result === undefined) {
        return <div>
            loading
        </div>
    }

    return <div>
        <img src={pageImage(book.result, Number(props.matches.page))} alt="" />
    </div>
}
