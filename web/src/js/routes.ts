import { route as preactRoute } from 'preact-router'

const routes: Map<string, string> = new Map()

export class Router {
    public readonly url: string

    constructor(name: string, parameters: Array<string | number> = []) {
        const path = routes.get(name)
        if (path === undefined) {
            throw new Error(`no route with the name ${name}`)
        }

        let i = -1
        this.url = path.split('/').map(part => {
            if (!part.startsWith(':')) {
                return part
            }
            i++
            if (part.endsWith('?') && parameters[i] === undefined) {
                return undefined
            }
            return encodeURIComponent(String(parameters[i]))
        }).filter(part => part !== undefined).join('/')
    }

    public navigate(replace?: boolean) {
        preactRoute(this.url, replace)
    }
}

export default function route(name: string, parameters: Array<string | number> = []): Router {
    return new Router(name, parameters)

}

export function add(path: string, name: string) {
    routes.set(name, path)
    return path
}
