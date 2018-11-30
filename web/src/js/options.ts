import { gql } from 'js/graphql'

class Options {

    public async getOrigin(): Promise<string> {
        return localStorage.getItem('origin')
    }
    public async setOrigin(o?: string): Promise<string> {
        const oldOrigin = await this.getOrigin()
        try {
            localStorage.setItem('origin', o)
            await gql('me{id}')
            return o
        } catch (e) {
            const origin = prompt('what origin are you useing? e.g. "http://192.168.1.10:8080"')

            if (origin) {
                return await this.setOrigin(origin)
            } else {
                localStorage.setItem('origin', oldOrigin)
                return await this.getOrigin()
            }
        }
    }

}

export default new Options()
