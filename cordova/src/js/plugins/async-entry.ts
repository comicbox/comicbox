class AsyncEntry {

    get filesystem() {
        return this.entry.fileSystem
    }

    get fullpath() {
        return this.entry.fullPath
    }

    get isDirectory() {
        return this.entry.isDirectory
    }

    get isFile() {
        return this.entry.isFile
    }

    get name() {
        return this.entry.name
    }

    get nativeURL() {
        return this.entry.nativeURL
    }

    public static generate(entry: Entry): AsyncEntry {
        if (entry.isFile) {
            return new AsyncFileEntry(entry)
        } else {
            return new AsyncDirectoryEntry(entry)
        }
    }

    protected entry: Entry

    constructor(entry: Entry) {
        this.entry = entry
    }

    public copyTo(parent: AsyncDirectoryEntry, newName: string): Promise<AsyncEntry> {
        return new Promise((resolve, reject) => {
            this.entry.copyTo(parent.de, newName, e => resolve(AsyncEntry.generate(e)), reject)
        })
    }

    public getMetadata(): Promise<Metadata> {
        return new Promise((resolve, reject) => {
            this.entry.getMetadata(resolve, reject)
        })
    }

    public getParent(): Promise<AsyncEntry> {
        return new Promise((resolve, reject) => {
            this.entry.getParent(e => resolve(AsyncEntry.generate(e)), reject)
        })
    }

    public moveTo(parent: AsyncDirectoryEntry, newName: string): Promise<AsyncEntry> {
        return new Promise((resolve, reject) => {
            this.entry.moveTo(parent.de, newName, e => resolve(AsyncEntry.generate(e)), reject)
        })
    }

    public remove(): Promise<File> {
        return new Promise((resolve, reject) => {
            this.entry.remove(resolve, reject)
        })
    }

    public toInternalURL(): string {
        return this.entry.toInternalURL()
    }

    public toURL(): string {
        return this.entry.toURL()
    }
}

// tslint:disable-next-line:max-classes-per-file
export class AsyncFileEntry extends AsyncEntry {

    get fe(): FileEntry {
        return this.entry as FileEntry
    }

    public file(): Promise<File> {
        return new Promise((resolve, reject) => {
            this.fe.file(resolve, reject)
        })
    }

    public createWriter(): Promise<FileWriter> {
        return new Promise((resolve, reject) => {
            this.fe.createWriter(resolve, reject)
        })
    }
}

// tslint:disable-next-line:max-classes-per-file
export class AsyncDirectoryEntry extends AsyncEntry {

    get de(): DirectoryEntry {
        return this.entry as DirectoryEntry
    }

    public readEntries(): Promise<Entry[]> {
        return new Promise((resolve, reject) => {
            this.de.createReader()
                .readEntries(entries => resolve(entries), reject)
        })
    }

    public async * readEntriesRecursive(): AsyncIterableIterator<AsyncEntry> {
        const entries = await this.readEntries()
        for (const e of entries) {
            if (e.isDirectory) {
                const de = new AsyncDirectoryEntry(e as DirectoryEntry)
                yield de
                yield* de.readEntriesRecursive()
            } else {
                const fe = new AsyncFileEntry(e as FileEntry)
                yield fe
            }
        }
    }

    public getFile(path: string, options?: Flags): Promise<AsyncFileEntry> {
        return new Promise(async (resolve, reject) => {
            this.de.getFile(path, options, fe => resolve(new AsyncFileEntry(fe)), reject)
        })
    }

    public getDirectory(path: string, options?: Flags): Promise<AsyncDirectoryEntry> {
        return new Promise(async (resolve, reject) => {
            this.de.getDirectory(path, options, fe => resolve(new AsyncDirectoryEntry(fe)), reject)
        })
    }

    public removeRecursively(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            this.de.removeRecursively(resolve, reject)
        })
    }
}
