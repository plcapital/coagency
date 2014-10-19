var routes = require('./routes');
var agency = require('./routes/agency');
var group = require('./routes/group');
var login = require('./routes/login');
var post = require('./routes/post');
var user = require('./routes/user');


exports.setup = function (app, modelProvider) {
    app.post('/createAgency', agency.create(modelProvider));

    app.post('/addGroupUser', group.addGroupUser(modelProvider));
    app.post('/createGroup', group.createGroup(modelProvider));
    
    app.post('/login', login.login(modelProvider));
    
    app.post('/createPost', post.createPost(modelProvider));
    
    app.post('/createUser', user.createUser(modelProvider));
}