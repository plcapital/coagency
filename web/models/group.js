var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var groupSchema = new Schema({
    name: String,
    description: String
});

exports.groupSchema = groupSchema;
