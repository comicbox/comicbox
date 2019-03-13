import User from 'js/model/user'
import url from 'js/url'
import { route } from 'preact-router'

class Auth extends EventTarget {

    private currentUser: User | null = null

    public async user(): Promise<User> {
        if (this.currentUser === null) {
            this.currentUser = await User.me()
        }

        if (this.currentUser.id === '00000000-0000-0000-0000-000000000000') {
            route('/login')
        }

        return this.currentUser
    }

    public async login(username: string, password: string): Promise<User | null> {

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
        this.currentUser = new User(data, true)
        this.dispatchEvent(new Event('login'))
        this.dispatchEvent(new Event('change'))
        return this.currentUser
    }

    public logout(): void {
        document.cookie = 'comicbox-session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
        this.currentUser = null
        route('/login')
        this.dispatchEvent(new Event('logout'))
        this.dispatchEvent(new Event('change'))
    }
}

const auth = new Auth()

export default auth
