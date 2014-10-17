var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    email: String,
    hash: String
});

var groupUserSchema = new Schema({
	userId: String,
	groupId: String
})

exports.userSchema = userSchema;
exports.groupUserSchema = groupUserSchema;
