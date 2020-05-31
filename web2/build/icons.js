const { readFileSync, writeFileSync } = require('fs')
const { join } = require('path')
const data = JSON.parse(readFileSync(join(__dirname, '../node_modules/material-icons/iconfont/MaterialIcons-Regular.ijmap.txt')).toString())

const iconUnion = Object.values(data.icons).map(i => `    | '${i.name.toLowerCase().replace(/ /g, '_')}'`).join('\n')
const src = 'export type IconName =\n' + iconUnion + '\n'

writeFileSync(join(__dirname, '../src/components/icon-type.ts'), src)