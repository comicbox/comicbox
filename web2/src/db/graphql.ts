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
        gql += '(' + Object.entries(query.args).map(([prop, value]) => prop + ":" + JSON.stringify(value)).join(', ') + ')'
    }

    gql += '{\n' + increaseTab(query.selects.map(select => {
        if (typeof select === 'string') {
            return select
        }
        return generate(select)
    }).join('\n')) + '\n}'

    return gql
}

export function run(query: GraphQLQuery) {
}

function increaseTab(code: string): string {
    return code.split('\n').map(line => '    ' + line).join('\n')
}
