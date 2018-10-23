const webpack = require('webpack');
const wpConfig = require('../webpack.config')
const { execSync } = require('child_process');

module.exports = function (context) {
    var Q = context.requireCordovaModule('q');
    var deferral = new Q.defer();

    console.log("Build JS")

    webpack(wpConfig(null, { mode: 'development' })).run((err, stats) => {
        if (err || stats.hasErrors()) {
            console.error(err)
        } else {
            console.log("Build Finished")
        }
        deferral.resolve();
    })
    
    execSync('npm run icon');

    return deferral.promise;
}
