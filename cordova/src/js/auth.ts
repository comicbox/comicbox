import User from 'js/model/user'
import { route } from 'preact-router'

let _user: User = null

export async function user(): Promise<User> {
    if (_user === null) {
        _user = await User.me()
    }

    if (_user.id === '00000000-0000-0000-0000-000000000000') {
        route('/login')
    }

    return _user
}

export async function login(username: string, password: string): Promise<User> {

    const data = await fetch('/login', {
        method: 'POST',
        body: JSON.stringify({
            username: username,
            password: password,
        }),
    }).then(r => r.json())

    if (data.error !== undefined) {
        return null
    }

    return new User(data, true)
}

export function logout(): void {
    document.cookie = 'comicbox-session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    _user = null
    route('/login')
}
