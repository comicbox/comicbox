
let dev: Device = null
const waiting: Array<() => void> = []

document.addEventListener('deviceready', () => {
    dev = device
    for (const cb of waiting) {
        cb()
    }
})

export default function Device(): Promise<Device> {
    return new Promise((resolve, reject) => {
        if (dev !== null) {
            resolve(dev)
        } else {
            waiting.push(() => {
                resolve(dev)
            })
        }
    })
}
