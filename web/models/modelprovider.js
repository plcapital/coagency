/**
 * Created by kohei on 2/02/2014.
 */

var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/agents');

var schema = mongoose.Schema;
var objectId = schema.ObjectId;

// schema definitions
var usersSchema = new schema({
    username: String,
    email: String
});

var postsSchema = new schema({
    title: String,
    description: String
});

// register models
mongoose.model('users', usersSchema);
mongoose.model('posts', postsSchema);

modelProvider = function () {
};

modelProvider.prototype.getModelByName = function(name) {
    return mongoose.model(name);
};

exports.modelProvider = modelProvider;
