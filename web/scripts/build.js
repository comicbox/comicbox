// const webpack = require('webpack');
// const wpConfig = require('../webpack.config')
// const { execSync } = require('child_process');

// module.exports = function (context) {
//     var Q = context.requireCordovaModule('q');
//     var deferral = new Q.defer();

//     console.log("Build JS")

//     webpack(wpConfig(null, { mode: 'development' })).run((err, stats) => {
//         if (err || stats.hasErrors()) {
//             console.error(err)
//         } else {
//             console.log("Build Finished")
//         }
//         deferral.resolve();
//     })

//     execSync('npm run icon');

//     return deferral.promise;
// }

const child = require('child_process');
const devMode = true

const args = []

if (devMode) {
    args.push('-debug')
}

args.push(...['-o', '../comicboxd/data/bindata.go', '-pkg', 'data', '../a/migrations/...', 'dist/...'])

const result = child.spawnSync('go-bindata', args)
if (result.stderr.length !== 0) {
    throw new Error(result.stderr.toString('utf8'))
}