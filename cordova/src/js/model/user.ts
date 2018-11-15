import { Model, prop, table } from 'js/model/model'

// tslint:disable-next-line:max-classes-per-file
@table('users')
export default class User extends Model {

    @prop('String')
    public id: string

    @prop('String')
    public name: string

    @prop('String')
    public username: string

    public get link() {
        return `/user/${this.username}`
    }

    public get sortIndex() {
        return `user-${this.username}`
    }
}
