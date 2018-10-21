import { RouterOnChangeArgs } from 'preact-router'

const historyStack: string[] = []

export function historyPush(e: RouterOnChangeArgs) {
    historyStack.push(e.url)
}

export function historyPop(): string {
    return historyStack.pop()
}

export function historyPrevious(): string {
    if (historyStack.length < 2) {
        return null
    }
    return historyStack[historyStack.length - 2]
}
