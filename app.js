/**
 * Created by guillermo on 14/04/2014.
 */
'use strict';
var http = require('http'),
    path = require('path'),
    socket = require('socket.io'),
    express = require('express'),
    logger = require('./logger'),
    mappings = require('./data/mappings');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('redirector'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    mappings.list(function(err, documents) {
        res.render('index');
    });
});

app.get('/:alias', function(req, res) {
    mappings.get(req.params.alias, function (err, mapping) {
        if (err) {
            return res.send(404);
        }

        res.redirect(mapping)
    });
});

var server = http.createServer(app);
server.listen(3000);

var io = socket.listen(server);
io.sockets.on('connection', function(socket) {
    mappings.list(function (err, documents) {
        socket.emit('list', documents);
    });

    socket.on('addMapping', function(mapping) {
        mappings.create(mapping.alias, mapping.url, function() {
            io.sockets.emit('newMapping', mapping);
        });
    });
});

console.log('server listening on port 3000');