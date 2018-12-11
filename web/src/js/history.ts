import { RouterOnChangeArgs } from 'preact-router'

const historyStack: string[] = []

export function historyPush(e: RouterOnChangeArgs) {
    historyStack.push(e.url)
}

export function historyPop(): string | null {
    const url = historyStack.pop()
    if (!url) {
        return null
    }
    return url
}

export function historyPrevious(): string | null {
    if (historyStack.length < 2) {
        return null
    }
    return historyStack[historyStack.length - 2]
}
