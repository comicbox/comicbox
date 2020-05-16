import { ittrQuery } from 'db/fetch'
import Dexie from 'dexie'
import { prepare } from 'db/graphql'
import { useState, useEffect } from 'preact/hooks'
import { EventEmitter } from 'events'
import { useAsync, Result } from 'async-hook'

const dbChanges = new EventEmitter()

export type ExtractType<Type> = Type extends Dexie.Table<infer X> ? X : never

export class Database extends Dexie {
    books: Dexie.Table<Book, string>
    series: Dexie.Table<Series, string>
    change: Dexie.Table<Change, string>

    constructor() {
        super("database");
        this.version(1).stores({
            books: 'id,series,change,created_at,[series+read+sort]',
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
    created_at: string
    series: string
    title: string
    volume: number
    chapter: number
    read: number
    pages: {
        type: 'FrontCover' | 'Story' | 'Deleted'
        file_number: number
    }
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
        'created_at',
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

export function useQuery<T, E, Args extends unknown[]>(cb: (...args: Args) => Promise<T>, args: Args): Result<T, E> {
    const result = useAsync<T, E, Args>(cb, args)


    useEffect(() => {
        const runQuery = () => {
            cb(...args)
        }

        dbChanges.on('change', runQuery)
        return () => dbChanges.off('change', runQuery)
    }, [cb, ...args])
    return result
}