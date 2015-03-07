var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

exports.AgencySchema = new Schema({
    administrator: ObjectId,
    name: String,
    phone: String
});
