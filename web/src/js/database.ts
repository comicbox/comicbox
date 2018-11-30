import Dexie from 'dexie'
import Book from './model/book'
import Series from './model/series'

interface Database extends Dexie {
    books: Dexie.Table<Book, string>
    series: Dexie.Table<Series, string>
}

const db = new Dexie('ComicBoxDB')

db.version(1).stores({
    books: 'id, [series+volume+chapter]',
    series: 'name',
})

export default db as Database
