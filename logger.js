/**
 * Created by guillermo on 14/04/2014.
 */
'use strict';
/**
 * Logs every request into console
 * @param appName the name of the app
 * @returns {Function}
 */
var setup = function(appName) {
    return function (req, res, next) {
        if (req.hasLoggedIn) {
            return next();
        }

        console.log(appName + ': ' + req.method + ' ' + req.url);
        req.hasLoggedIn = true;
        next();
    }
};

module.exports = setup;