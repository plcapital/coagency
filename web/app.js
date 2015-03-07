/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var MongoStore = require('connect-mongo')(express);
var expressValidator = require('express-validator');

var path = require('path');

var gets = require('./get');
var posts = require('./post');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

// TODO move string out into resources/bundles

// TODO move this session configuration to a better home
var conf = {
    db: {
        db: 'coagency',
        host: 'localhost'
    },
    secret: 'coagency'
};

app.configure(function () {
    app.use(express.cookieParser());
    app.use(express.session({
        secret: conf.secret,
        maxAge: new Date(Date.now() + 3600000),
        store: new MongoStore(conf.db)
    }));
    app.use(express.bodyParser());
    app.use(expressValidator());
    // important that this comes after session management
    // TODO why?
    app.use(app.router);
});

var ModelProvider = require('./models/modelprovider').modelProvider;
var modelProvider = new ModelProvider();

gets.setup(app, modelProvider);
posts.setup(app, modelProvider);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
