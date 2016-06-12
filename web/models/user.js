var mongoose = require("mongoose");

var Schema = mongoose.Schema;

exports.UserSchema = new Schema({
    username: String,
    email: String,
    hash: String
});

exports.GroupUserSchema = new Schema({
    userId: String,
    groupId: String
})
