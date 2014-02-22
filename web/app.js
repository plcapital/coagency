/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var mongoStore = require('connect-mongo')(express);

var routes = require('./routes');
var login = require('./routes/login');
var post = require('./routes/post');
var user = require('./routes/user');
var path = require('path');

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
        db: 'agents',
        host: 'localhost'
    },
    secret: 'coagency'
};

app.configure(function () {
    app.use(express.cookieParser());
    app.use(express.session({
        secret: conf.secret,
        maxAge: new Date(Date.now() + 3600000),
        store: new mongoStore(conf.db)
    }));
    // important that this comes after session management
    // TODO why?
    app.use(app.router);
});

var modelProvider = require('./models/modelprovider').modelProvider;
var modelProvider = new modelProvider(); // TODO rename (a bit confusing)?

app.get('/', routes.indexPage);
app.get('/login', login.loginPage);
app.get('/logout', login.logout);
app.get('/posts', post.listPage(modelProvider));
app.get('/createPost', post.createPage);
app.get('/users', user.listPage(modelProvider));

app.post('/login', login.loginAuthentication);
app.post('/createPost', post.create(modelProvider));

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
