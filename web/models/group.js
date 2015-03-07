var mongoose = require("mongoose");

var Schema = mongoose.Schema;

exports.GroupSchema = new Schema({
    name: String,
    description: String,
    administrator: String
});
