var mongoose = require("mongoose");

var Schema = mongoose.Schema;

exports.ListingSchema = new Schema({
    title: String,
    description: String,
    groupId: String
});
