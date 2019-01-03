interface Dictionary<T> {
    [index: string]: T
}

interface TEvent<T extends EventTarget = HTMLElement> extends Event {
    target: T
}