import Options from 'js/options'

export default async function url(path: string): Promise<string> {
    // if (location.protocol === 'file:') {
    //     let origin = await Options.getOrigin()
    //     if (!origin) {
    //         origin = prompt('what origin are you useing? e.g. "http://192.168.1.10:8080"')
    //         await Options.setOrigin(origin)
    //     }
    //     return origin + path
    // }

    return location.origin + path
}
