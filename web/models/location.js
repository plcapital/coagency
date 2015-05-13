var mongoose = require("mongoose");

var Schema = mongoose.Schema;

exports.LocationSchema = new Schema({
    name: String,
    description: String,
    city: String,
    state: String,
    country: String
});
