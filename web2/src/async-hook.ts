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

export function useAsync<T, E, Args extends unknown[]>(cb: (...args: Args) => Promise<T>, args: Args, inputs: Inputs = []): Result<T, E> {
    const [result, setResult] = useState<Result<T, E>>({
        loading: true,
        error: undefined,
        result: undefined,
    })

    useEffect(() => {
        cb(...args)
            .then(ret => {
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