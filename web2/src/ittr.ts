type Transformer<T, U> = (source: AsyncIterable<T>) => AsyncIterable<U>
export class Ittr<T> implements AsyncIterable<T> {

    constructor(
        private source: AsyncIterable<T>,
    ) { }

    [Symbol.asyncIterator](): AsyncIterator<T, any, undefined> {
        // if (Symbol.asyncIterator in this.source) {
        //     throw new Error('')
        // }
        return this.source[Symbol.asyncIterator]()
    }

    public transform<U>(transformer: Transformer<T, U>): Ittr<U> {
        return new Ittr(transformer(this))
    }
}

export function ittr<T>(source: AsyncIterable<T>): Ittr<T> {
    return new Ittr(source)
}

export function chunk<T>(count: number): Transformer<T, T[]> {
    return async function* (source) {
        let current = []
        for await (const element of source) {
            current.push(element)
            if (current.length >= count) {
                yield current
                current = []
            }
        }
        if (current.length > 0) {
            yield current
        }
    }
}
