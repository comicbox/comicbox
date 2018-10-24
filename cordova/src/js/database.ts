import Dexie from 'dexie'
import Book from './model/book';

interface Database extends Dexie {
    books: Dexie.Table<Book, string>
}

const db = new Dexie('ComicBoxDB')

db.version(1).stores({
    books: 'id, [series+volume+chapter]',
})

export default db as Database
