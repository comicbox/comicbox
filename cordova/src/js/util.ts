export function str_random(len: number = 10) {
    let text = ''
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (let i = 0; i < len; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return text
}

export function isString(value: any) {
    return typeof value === 'string' || value instanceof String
}
