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
    console.log(data);

    return null
}
