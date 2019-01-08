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

export const emptyImage = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='

// interface FormData {
//     [name: string]: string | string[] | FormData | FormData[]
// }

// export function getFormData(form: HTMLFormElement): FormData {
//     let elements: NodeListOf<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | HTMLButtonElement>
//     // tslint:disable-next-line:max-line-length
//     elements = form.querySelectorAll('input[name],textarea[name],button[name],select[name],input[id],textarea[id],button[id],select[id]')

//     const data: FormData = {}
//     for (const element of elements) {
//         if (element.type !== 'submit') {
//             const name = element.name || element.id
//             let tempData = data
//             for (const part of firsts(regexAllMatches(/[^\[\]]+/gm, name))) {
//                 tempData = tempData[part]
//             }
//             tempData = element.value
//         }
//     }

//     return data
// }

// function firsts(arr: string[][]): string[] {
//     return arr.map(a => a[0] || null).filter(a => a !== null) as string[]
// }

// function regexAllMatches(regex: RegExp, str: string) {
//     let m
//     const matches: string[][] = []
//     // tslint:disable-next-line:no-conditional-assignment
//     while ((m = regex.exec(str)) !== null) {
//         // This is necessary to avoid infinite loops with zero-width matches
//         if (m.index === regex.lastIndex) {
//             regex.lastIndex++
//         }

//         matches.push(m)
//     }
//     return matches
// }
