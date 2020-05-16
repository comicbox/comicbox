import { ittrQuery } from 'db/fetch'
import Dexie from 'dexie'
import { prepare } from 'db/graphql'
import { useState, useEffect } from 'preact/hooks'
import { EventEmitter } from 'events'

const dbChanges = new EventEmitter()

export type ExtractType<Type> = Type extends Dexie.Table<infer X> ? X : never

export class Database extends Dexie {
    books: Dexie.Table<Book, string>
    series: Dexie.Table<Series, string>
    change: Dexie.Table<Change, string>

    constructor() {
        super("database");
        this.version(1).stores({
            books: 'id,series,change,[series+read+sort]',
            series: 'name,list,change',
            change: 'table,change',
        })

        this.books = this.table("books");
        this.series = this.table("series");
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

export interface Series {
    name: string
    change: number
    list: 'READING' | 'PAUSED' | 'COMPLETED' | 'DROPPED' | 'PLANNING'
}

interface Change {
    table: string
    change: number
}

export const db = new Database()

export async function init() {

    const bookSelects = [
        'id',
        'change',
        'series',
        'title',
        'volume',
        'chapter',
        'sort',
        'read',
        prepare('pages', {}, 'type', 'file_number'),
    ]
    for await (const books of ittrQuery('books', bookSelects)) {
        await db.books.bulkPut(books.map(b => ({
            ...b,
            read: b.read ? 1 : 0,
        })))
    }

    const seriesSelects = [
        'name',
        'change',
        'list',
    ]
    for await (const series of ittrQuery('series', seriesSelects)) {
        await db.series.bulkPut(series)
    }

    dbChanges.emit('change')
}

export async function nextChapter(series: string) {
    return await db.books.where(['series', 'read', 'sort'])
        .between(
            [series, 0, Dexie.minKey],
            [series, 0, Dexie.maxKey],
            true, true)
        .first();
}

export function useQuery<T extends KeyOfType<Database, Dexie.Table>>(
    table: T,
    cb: (q: Database[T]) => Dexie.Collection<ExtractType<Database[T]>>
): ExtractType<Database[T]>[] | undefined {
    const [result, setResult] = useState<ExtractType<Database[T]>[] | undefined>(undefined)

    const runQuery = () => {
        console.log('query');
        cb(db[table])
            .toArray()
            .then(ret => setResult(ret))
    }


    useEffect(() => {
        runQuery()

        dbChanges.on('change', runQuery)
        return () => dbChanges.off('change', runQuery)
    }, [table])
    return result
}