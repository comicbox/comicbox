import * as grapql from 'js/graphql'

export interface Book {
    id: string
    alternate_series: string
    authors: string[]
    chapter: number
    community_rating: number
    created_at: string
    current_page: number
    date_released: string
    file: string
    genres: string[]
    last_page_read: number
    pages: Page[]
    rating: number
    read: Boolean
    reading_direction: string
    series: string
    story_arc: string
    summary: string
    title: string
    type: string
    updated_at: string
    volume: number
    web: string
}

export interface Page {
    file_number: number
    type: string
    url: string
}

export async function Find(id: string): Promise<Book> {
    let r = await grapql.Exec(`
    query getBook($id: ID!) {
        book(id: $id) {
            id
            alternate_series
            authors
            chapter
            community_rating
            created_at
            current_page
            date_released
            file
            genres
            last_page_read
            pages {
                file_number
                type
                url
            }
            rating
            read
            reading_direction
            series
            story_arc
            summary
            title
            type
            updated_at
            volume
            web
        }
    }      
    `, { id: id })
    return r.data.book
}