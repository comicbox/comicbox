import { join } from 'path'
import { AsyncFileEntry } from './plugins/async-entry'
import { getRoot, writeFile } from './plugins/file'

const cacheVersion = 'v1'

function toDataURL(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result as string)
        reader.onerror = reject
        reader.readAsDataURL(blob)
    })
}

export async function cache(url: string): Promise<string> {
    let file: AsyncFileEntry
    const purl = new URL(url, location.origin)
    const fileName = join('cache', cacheVersion, purl.pathname)
    const root = await getRoot()

    try {
        file = await root.getFile(fileName)
    } catch (_) {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw response
                }
                return response.blob()
            })
            .then(blob => writeFile(fileName, blob))

        return url
    }

    // return file.toURL() // doesn't work on firefox
    return await toDataURL(await file.file())
}
