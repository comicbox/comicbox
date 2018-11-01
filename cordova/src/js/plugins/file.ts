import { isString } from 'js/util'
import { AsyncFileEntry } from './file-entry'

declare const cordova: any

let _file: FileSystem = null
const queue: Array<(error: any) => void> = []

document.addEventListener('deviceready', onDeviceReady, false)
function onDeviceReady() {

    window.requestFileSystem(window.PERSISTENT, 0, fs => {
        _file = fs
        for (const cb of queue) {
            cb(null)
        }

    }, err => {
        for (const cb of queue) {
            cb(err)
        }
    })
}

export function getFS(): Promise<FileSystem> {
    return new Promise((resolve, reject) => {
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

export function getFile(path: string, options?: Flags): Promise<AsyncFileEntry> {
    return new Promise(async (resolve, reject) => {
        const fs = await getFS()
        fs.root.getFile(path, options, fe => resolve(new AsyncFileEntry(fe)), reject)
    })
}

export function readFile(path: string): Promise<string | ArrayBuffer> {
    return new Promise(async (resolve, reject) => {
        const fe = await getFile(path)
        const reader = new FileReader()
        const file = await fe.file()
        reader.onloadend = function () {
            resolve(this.result)
        }
        reader.onerror = function () {
            reject(this.error)
        }
        reader.readAsText(file)
    })
}

export function writeFile(path: string, data: string | Blob): Promise<null> {
    return new Promise(async (resolve, reject) => {
        const fe = await getFile(path, {create: true, exclusive: true})
        const writer = await fe.createWriter()

        writer.onwriteend = () => resolve()
        writer.onerror = err => reject(err)

        if (isString(data)) {
            data = new Blob([data], { type: 'text/plain' })
        }

        writer.write(data as Blob)
    })
}
