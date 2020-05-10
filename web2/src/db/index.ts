import { fetchQuery, ittrQuery } from './fetch'
import Dexie from 'dexie'

class Database extends Dexie {
    books: Dexie.Table<Book, number>

    constructor() {
        super("database");
        this.version(1).stores({
            books: 'id,series'
        })

        this.books = this.table("books");
    }
}

interface Book {
    id: string
    updated_at: string
    series: string
    title: string
    volume: number
    chapter: number
    cover: {
        url: string
    }
}

export const db = new Database()

export async function init() {
    for await (const book of ittrQuery()) {
        db.books.put(book)
    }
}
