import { fetchQuery, ittrQuery } from './fetch'
import Dexie from 'dexie'
import { ittr, chunk } from '../ittr'

class Database extends Dexie {
    books: Dexie.Table<Book, string>
    change: Dexie.Table<Change, string>

    constructor() {
        super("database");
        this.version(1).stores({
            books: 'id,series,change,[series+read+sort]',
            change: 'table,change',
        })

        this.books = this.table("books");
        this.change = this.table("change");
    }
}

export interface Book {
    id: string
    change: number
    series: string
    title: string
    volume: number
    chapter: number
    pages: {
        type: 'FrontCover' | 'Story' | 'Deleted'
        file_number: number
    }
    read: number
}

interface Change {
    table: string
    change: number
}

function sleep(time: number) {
    return new Promise(resolve => {
        setTimeout(resolve, time)
    })
}

export const db = new Database()

export async function init() {

    for await (const books of ittrQuery()) {
        await db.books.bulkPut(books.map(b => ({
            ...b,
            read: b.read ? 1 : 0,
        })))
    }

    // // await sleep(5000)

    // console.log('series');
    // console.time('keys')
    // const keys = await db.books.orderBy('series').uniqueKeys()
    // console.timeEnd('keys')

    // console.time('series')
    // for (const series of keys.slice(0, 1)) {
    //     const next = await db.books.where(['series', 'read', 'sort'])
    //         .between(
    //             [series, 0, Dexie.minKey],
    //             [series, 0, Dexie.maxKey],
    //             true, true)
    //         .first();
    //     console.log(next);

    // }
    // console.timeEnd('series')
}

export async function nextChapter(series: string) {
    return await db.books.where(['series', 'read', 'sort'])
        .between(
            [series, 0, Dexie.minKey],
            [series, 0, Dexie.maxKey],
            true, true)
        .first();
}