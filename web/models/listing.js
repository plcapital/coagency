var mongoose = require("mongoose");

var Schema = mongoose.Schema;

exports.ListingSchema = new Schema({
    userId: String,
    groupId: String,
    description: String,
    location: String,
    type: String,
    category: String,
    property: String,
    area: String,
    measure: String,
    price: String,
    bedrooms: String,
    bathrooms: String,
    tenure: String
});
