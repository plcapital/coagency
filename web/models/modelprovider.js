var Agency = require('./agency');
var Group = require('./group');
var Listing = require('./listing');
var User = require('./user');

var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/coagency');

// register models
mongoose.model('agency', Agency.AgencySchema);
mongoose.model('group', Group.GroupSchema);
mongoose.model('listing', Listing.ListingSchema);
mongoose.model('user', User.UserSchema);
mongoose.model('groupUser', User.GroupUserSchema);

modelProvider = function () {
};

modelProvider.prototype.getModelByName = function(name) {
    return mongoose.model(name);
};

exports.modelProvider = modelProvider;
