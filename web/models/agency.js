var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var agencySchema = new Schema({
    name: String,
    administrator: ObjectId,
    phone: String
});

exports.agencySchema = agencySchema;