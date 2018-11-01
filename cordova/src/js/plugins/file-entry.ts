export class AsyncFileEntry {
    private fe: FileEntry

    constructor(fe: FileEntry) {
        this.fe = fe
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
