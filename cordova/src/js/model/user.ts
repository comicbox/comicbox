import { Model, prop, table } from 'js/model/model'

@table('users', 'user', 'UserInput!')
export default class User extends Model {

    public static searchTypes = {
        me: { type: 'Boolean' },
    }

    public static async me(): Promise<User> {
        const users = User.where('me', true).get()
        const result = await users.next()

        if (result.done) {
            return null
        }

        // if (!result.value.fresh && fresh) {
        //     const newResult = await users.next()
        //     if (!newResult.done) {
        //         return newResult.value
        //     }
        // }
        return result.value
    }

    @prop('String')
    public id: string

    @prop('String')
    public name: string

    @prop('String')
    public username: string

    @prop('String', { writeOnly: true })
    public password: string

    public get link() {
        return `/user/${this.username}`
    }

    public get sortIndex() {
        return `user-${this.username}`
    }
}
