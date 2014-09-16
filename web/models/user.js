var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    email: String,
    hash: String
});

exports.userSchema = userSchema;
