declare const cordova: any

let _file: any = null
const queue: Array<() => void> = []

document.addEventListener('deviceready', onDeviceReady, false)
function onDeviceReady() {
    console.log('cordova', cordova)

    _file = cordova.file
    for (const cb of queue) {
        cb()
    }

    window.requestFileSystem(window.PERSISTENT, 0, fs => {

        console.log('file system open: ' + fs.name)
        fs.root.getFile('newPersistentFile.txt', { create: true, exclusive: false }, fileEntry => {

            console.log('fileEntry is file?' + fileEntry.isFile.toString())
            console.log('fileEntry fullPath: ' + fileEntry.fullPath)
            console.log('fileEnrty:', fileEntry)

            // fileEntry.name == 'someFile.txt'
            // fileEntry.fullPath == '/someFile.txt'
            writeFile(fileEntry, null)

        }, console.warn)

    }, console.warn)
}

function getFile(): Promise<any> {
    return new Promise((resolve, reject) => {
        if (_file !== null) {
            resolve(_file)
        } else {
            queue.push(() => resolve(_file))
        }
    })
}

// function getFS(): Promise<any> {
// }

export async function cache(): Promise<FileEntry> {
    const file = await getFile()
    console.log(file)

    return file.cacheDirectory
}

function writeFile(fileEntry: FileEntry, dataObj: any) {
    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(fileWriter => {

        fileWriter.onwriteend = () => {
            console.log('Successful file write...')
            readFile(fileEntry)
        }

        fileWriter.onerror = e => {
            console.log('Failed file write: ' + e.toString())
        }

        // If data object is not passed in,
        // create a new Blob instead.
        if (!dataObj) {
            dataObj = new Blob(['some file data'], { type: 'text/plain' })
        }

        fileWriter.write(dataObj)
    })
}

function readFile(fileEntry: FileEntry) {

    fileEntry.file(file => {
        const reader = new FileReader()

        reader.onloadend = function () {
            console.log('Successful file read: ' + this.result)
            // displayFileData(fileEntry.fullPath + ': ' + this.result)
        }

        reader.readAsText(file)

    }, console.warn)
}
