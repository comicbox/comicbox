import { useState, useEffect, Inputs } from 'preact/hooks'

export type Result<T, E> = {
    loading: true
    error: undefined
    result: undefined
} | {
    loading: false
    error: undefined
    result: T
} | {
    loading: false
    error: E
    result: undefined
}

export function useAsync<T, E = Error, Args extends unknown[] = []>(cb: (...args: Args) => Promise<T>, args: Args, inputs: Inputs = []): Result<T, E> {
    const [result, setResult] = useState<Result<T, E>>({
        loading: true,
        error: undefined,
        result: undefined,
    })

    useEffect(() => {
        // const timeKey = Math.random().toString().slice(2, 6)
        const timeKey = cb.toString()
        console.time(timeKey)
        cb(...args)
            .then(ret => {
                console.timeEnd(timeKey)
                setResult({
                    loading: false,
                    error: undefined,
                    result: ret
                })
            })
            .catch(err => {
                setResult({
                    loading: false,
                    error: err,
                    result: undefined
                })
            })
    }, [...args, ...inputs])

    return result
}