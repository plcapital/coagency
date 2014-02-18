/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var login = require('./routes/login');
var http = require('http');
var path = require('path');
var mongo = require('mongodb');
var mongoStore = require('connect-mongo')(express);

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

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/userlist', routes.userlist(modelProvider));
app.get('/posts', routes.posts(modelProvider));
app.get('/newpost', routes.newpost);
app.get('/login', login.loginPage);

app.post('/login', login.loginAuthentication);
app.post('/createpost', routes.createpost(modelProvider));

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
