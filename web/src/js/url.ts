export default async function url(path: string): Promise<string> {
    return location.origin + path
}
