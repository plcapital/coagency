/**
 * Created by kohei on 2/02/2014.
 */

var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/agents');

var Schema = mongoose.Schema;
var objectId = Schema.ObjectId;

// Schema definitions
var usersSchema = new Schema({
    username: String,
    email: String
});

var postsSchema = new Schema({
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
