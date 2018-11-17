import User from 'js/model/user'

let _user: User = null

export async function user(): Promise<User> {
    if (_user === null) {
        _user = await User.me()
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

    return new User(data, true)
}

export function logout(): void {
    document.cookie = 'comicbox-session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
}
