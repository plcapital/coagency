var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var agencySchema = new Schema({
    administrator: ObjectId,
    name: String,
    phone: String
});

exports.agencySchema = agencySchema;