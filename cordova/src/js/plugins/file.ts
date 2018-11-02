import { isString } from 'js/util'
import { dirname } from 'path'
import { AsyncDirectoryEntry, AsyncFileEntry } from './async-entry'

declare const cordova: any

let _file: FileSystem = null
let fsError: any = null
const queue: Array<(error: any) => void> = []

document.addEventListener('deviceready', onDeviceReady, false)
function onDeviceReady() {

    window.requestFileSystem(window.PERSISTENT, 0, fs => {
        _file = fs
        for (const cb of queue) {
            cb(null)
        }

    }, err => {
        fsError = err
        for (const cb of queue) {
            cb(err)
        }
    })
}

export function getFS(): Promise<FileSystem> {
    return new Promise((resolve, reject) => {
        if (fsError !== null) {
            reject(fsError)
            return
        }
        if (_file !== null) {
            resolve(_file)
        } else {
            queue.push(err => {
                if (err == null) {
                    resolve(_file)
                } else {
                    reject(err)
                }
            })
        }
    })
}

export async function getRoot(): Promise<AsyncDirectoryEntry> {
    const fs = await getFS()
    return new AsyncDirectoryEntry(fs.root)
}

export function readFile(path: string): Promise<string> {
    return new Promise(async (resolve, reject) => {
        const root = await getRoot()
        const fe = await root.getFile(path)
        const reader = new FileReader()
        const file = await fe.file()
        reader.onloadend = function () {
            resolve(this.result as string)
        }
        reader.onerror = function () {
            reject(this.error)
        }
        reader.readAsText(file)
    })
}

export async function mkdir(path: string): Promise<void> {
    const root = await getRoot()
    let currentPath = ''
    for (const part of path.split('/')) {
        currentPath += '/' + part
        root.getDirectory(currentPath, { create: true })
    }
}

export function writeFile(path: string, data: string | Blob): Promise<void> {
    return new Promise(async (resolve, reject) => {
        await mkdir(dirname(path))
        const root = await getRoot()
        const fe = await root.getFile(path, { create: true })
        const writer = await fe.createWriter()

        writer.onwriteend = () => resolve()
        writer.onerror = err => reject(err)

        if (isString(data)) {
            data = new Blob([data], { type: 'text/plain' })
        }

        writer.write(data as Blob)
    })
}

export async function purge() {
    const root = await getRoot()
    const dir = await root.getDirectory('/')
    const entries = dir.readEntriesRecursive()

    for await (const e of entries) {
        e.remove()
    }
}
