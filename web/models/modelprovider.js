var agency = require('./agency');
var group = require('./group');
var post = require('./post');
var user = require('./user');

var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/coagency');

// register models
mongoose.model('agency', agency.agencySchema);
mongoose.model('group', group.groupSchema);
mongoose.model('post', post.postSchema);
mongoose.model('user', user.userSchema);

modelProvider = function () {
};

modelProvider.prototype.getModelByName = function(name) {
    return mongoose.model(name);
};

exports.modelProvider = modelProvider;
