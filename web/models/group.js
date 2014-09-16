var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var groupSchema = new Schema({
    name: String,
    description: String,
    administrator: String
});

exports.groupSchema = groupSchema;
