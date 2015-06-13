var routes = require('./routes');
var agency = require('./routes/agency');
var comment = require('./routes/comment');
var group = require('./routes/group');
var login = require('./routes/login');
var listing = require('./routes/listing');
var user = require('./routes/user');


exports.setup = function (app, modelProvider) {
    app.post('/createAgency', agency.create(modelProvider));

    app.post('/createComment', comment.createComment(modelProvider));

    app.post('/addGroupUser', group.addGroupUser(modelProvider));
    app.post('/createGroup', group.createGroup(modelProvider));
    
    app.post('/login', login.login(modelProvider));
    
    app.post('/createListing', listing.createListing(modelProvider));
    app.post('/searchListings', listing.searchListings(modelProvider));
    
    app.post('/createUser', user.createUser(modelProvider));
}
