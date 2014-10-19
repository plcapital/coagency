var routes = require('./routes');
var agency = require('./routes/agency');
var group = require('./routes/group');
var login = require('./routes/login');
var post = require('./routes/post');
var user = require('./routes/user');

exports.setup = function (app, modelProvider) {
    app.get('/', routes.indexPage);

    app.get('/createAgency', agency.createAgencyPage);

    app.get('/addGroupUser', group.addGroupUserPage(modelProvider));
    app.get('/createGroup', group.createGroupPage);
    app.get('/listAllGroups', group.listAllGroupsPage(modelProvider));
    app.get('/listGroups', group.listGroupsPage(modelProvider));
    app.get('/viewGroup', group.viewGroupPage(modelProvider))

    app.get('/login', login.loginPage);
    app.get('/logout', login.logoutPage);

    app.get('/createPost', post.createPostPage);
    app.get('/listPosts', post.listPostsPage(modelProvider));

    app.get('/createUser', user.createUserPage);
    app.get('/listUsers', user.listUsersPage(modelProvider));
}
