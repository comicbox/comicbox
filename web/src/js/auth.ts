import EventTarget from 'event-target-shim'
import User from 'js/model/user'
import route from 'js/routes'
import url from 'js/url'

class Auth extends EventTarget {

    private currentUser: User | null = null

    public async user(): Promise<User> {
        if (this.currentUser === null) {
            this.currentUser = await User.me()
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
        route('login').navigate()
        this.dispatchEvent(new Event('logout'))
        this.dispatchEvent(new Event('change'))
    }

    public async guest(): Promise<boolean> {
        const user = await this.user()
        if (!user) {
            return true
        }
        return user.id === '00000000-0000-0000-0000-000000000000'
    }
}

const auth = new Auth()

export default auth
