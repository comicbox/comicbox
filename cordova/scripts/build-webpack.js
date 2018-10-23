const webpack = require('webpack');
const wpConfig = require('../webpack.config')

module.exports = function (context) {
    var Q = context.requireCordovaModule('q');
    var deferral = new Q.defer();

    console.log("Building JS", context)

    webpack(wpConfig(null, { mode: 'development' })).run((err, stats) => {
        if (err || stats.hasErrors()) {
            console.error(err)
        } else {
            console.log("Build Good")
        }
        deferral.resolve();
    })

    return deferral.promise;
}
