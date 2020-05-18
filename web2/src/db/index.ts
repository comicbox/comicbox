import { ittrQuery } from 'db/fetch'
import Dexie, { Transaction } from 'dexie'
import { prepare } from 'db/graphql'
import { useState, useEffect, Inputs } from 'preact/hooks'
import { EventEmitter } from 'events'
import { useAsync, Result } from 'async-hook'

const dbChanges = new EventEmitter()
dbChanges.setMaxListeners(10000)

export type ExtractType<Type> = Type extends Dexie.Table<infer X> ? X : never

export class Database extends Dexie {
    books: Dexie.Table<Book, string>
    series: Dexie.Table<Series, string>
    change: Dexie.Table<Change, string>

    constructor() {
        super("database");
        this.version(1).stores({
            books: 'id,series,change,created_at,[series+sort],[series+read+sort]',
            series: 'name,list,change,*search',
            change: 'table,change',
        })

        this.books = this.table("books")
        this.series = this.table("series")
        this.change = this.table("change")

        this.series.hook('creating', (pkey, series) => this.addSeriesSearch(series))
        this.series.hook('updating', (changes, pkey, series) => this.addSeriesSearch(series))
    }

    private addSeriesSearch(series: Series) {
        series.search = series.name.split(' ')
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
    current_page: number
    pages: {
        type: 'FrontCover' | 'Story' | 'Deleted'
        file_number: number
    }[]
}

export interface Series {
    name: string
    change: number
    list: 'READING' | 'PAUSED' | 'COMPLETED' | 'DROPPED' | 'PLANNING' | 'NONE'
    search: string[]
    read: number
    total: number
}

interface Change {
    table: string
    change: number
    skip: number
}

export const db = new Database()

export async function updateDatabase() {

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
        'current_page',
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
        'read',
        'total',
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

export function useQuery<T, E = Error, Args extends unknown[] = []>(cb: (...args: Args) => Promise<T>, args: Args, inputs: Inputs = []): Result<T, E> {
    const result = useAsync<T, E, Args>(cb, args, inputs)

    useEffect(() => {
        const runQuery = () => {
            cb(...args)
        }

        dbChanges.on('change', runQuery)
        return () => dbChanges.off('change', runQuery)
    }, [cb, ...args, inputs])
    return result
}