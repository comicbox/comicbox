
export default function url(path: string): string {
    if (location.protocol === 'file:') {
        let origin = localStorage.getItem('origin')
        if (!origin) {
            origin = prompt('what origin are you useing? e.g. "http://192.168.1.10:8080"')
            localStorage.setItem('origin', origin)
        }
        return origin + path
    }

    return path
}
