import User from 'js/model/user'
import url from 'js/url'
import { route } from 'preact-router'

let _user: User | null = null

export async function user(): Promise<User> {
    if (_user === null) {
        _user = await User.me()
    }

    return _user
}

export async function login(username: string, password: string): Promise<User | null> {

    const data = await fetch(await url('/login'), {
        method: 'POST',
        body: JSON.stringify({
            username: username,
            password: password,
        }),
    }).then(r => r.json())

    if (data.error !== undefined) {
        return null
    }
    _user = new User(data, true)
    return _user
}

export function logout(): void {
    document.cookie = 'comicbox-session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    _user = null
    route('/login')
}
