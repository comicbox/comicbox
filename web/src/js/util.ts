export function str_random(len: number = 10) {
    let text = ''
    // const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    for (let i = 0; i < len; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return text
}

export function isString(value: any) {
    return typeof value === 'string' || value instanceof String
}

export function debounce(fn: (...args: any[]) => any, delay: number) {
    let timer: any = null
    return (...args: any[]) => {
      // const context = this
      clearTimeout(timer)
      timer = setTimeout(() => {
        fn.call(this, args)
        // fn.apply(context, args)
      }, delay)
    }
  }