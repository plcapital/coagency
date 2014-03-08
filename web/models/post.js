var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var postSchema = new Schema({
    title: String,
    description: String
});

exports.postSchema = postSchema;
