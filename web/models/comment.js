var mongoose = require("mongoose");

var Schema = mongoose.Schema;

exports.CommentSchema = new Schema({
    userId: String,
    listingId: String,
    creationDate: String,
    text: String
});
