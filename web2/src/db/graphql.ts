export interface GraphQLQuery {
    name: string
    args: { [P in string]: unknown },
    selects: Array<string | GraphQLQuery>
}

export function prepare(name: string, args: { [arg: string]: unknown }, ...selects: Array<string | GraphQLQuery>): GraphQLQuery {
    return { name, args, selects }
}

export function generate(query: GraphQLQuery) {
    let gql = query.name

    if (Object.keys(query.args).length > 0) {
        gql += '(' + Object.entries(query.args).map(([prop, value]) => prop + ":" + serialize(value)).join(', ') + ')'
    }

    gql += '{\n' + increaseTab(query.selects.map(select => {
        if (typeof select === 'string') {
            return select
        }
        return generate(select)
    }).join('\n')) + '\n}'

    return gql
}

export async function fetchQuery(query: string, variables: any): Promise<Response> {
    const r = await fetch('/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: query,
            variables: variables,
        }),
    })

    if (r.status === 401) {
        throw new Error('you must login')
    }
    if (!r.ok) {
        throw new Error(await r.text())
    }

    return r
}

export function run(query: GraphQLQuery) {
    return fetchQuery(generate(query), {})
}

function increaseTab(code: string): string {
    return code.split('\n').map(line => '    ' + line).join('\n')
}


export function serialize(v: any, replacer?: undefined, space?: string): string {
    if (v === undefined || v === null) {
        return 'null'
    }
    if (typeof v === 'object' && v.serializeGQL) {
        return v.serializeGQL()
    }
    if (v instanceof Map) {
        const cols = Array.from(v).map(([key, element]) => key + ': ' + serialize(element, replacer, space))
        if (space !== undefined) {
            return `{\n${increaseTab(cols.join('\n'))}\n}`
        }
        return `{${cols.join(' ')}}`
    }
    if (v instanceof Array) {
        const entries = v.map(a => serialize(a, replacer, space))
        if (space !== undefined) {
            return '[\n' + increaseTab(entries.join(',\n')) + '\n]'
        }
        return '[' + entries.join(', ') + ']'
    }
    if (typeof v === 'object') {
        return serialize(new Map(Object.entries(v)), replacer, space)
    }
    return JSON.stringify(v)
}