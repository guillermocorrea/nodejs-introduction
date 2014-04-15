/**
 * Created by guillermo on 14/04/2014.
 */
'use strict';
var path = require('path'),
    DataStore = require('nedb');

var db = {
    mappings: new DataStore()
};

db.mappings.insert({alias: 'g', url: 'http://www.google.com'}, function(err, inserted) {
   // ...
});

/*var data = {
    g: 'http://www.google.com'
};*/
var mappings = {
    get: function(alias, callback) {
        db.mappings.findOne({alias: alias}, function(err, mapping) {
            if (err || !mapping) {
                return callback(new Error('Alias not found.'));
            }

            return callback(null, mapping.url);
        });
    },

    create: function(alias, url, callback) {
        db.mappings.insert({alias: alias, url: url}, callback());
    },

    list: function(callback) {
        db.mappings.find({}).sort({alias: 1}).exec(callback);
    }
};

module.exports = mappings;