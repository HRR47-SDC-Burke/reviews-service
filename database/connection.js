// getting-started.js
const mongoose = require('mongoose');
var faker = require('faker');

//connect mongoose to localhost
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true });

//define reviewSchema values
const reviewSchema = new mongoose.Schema({
  imageURL: String,
  user: String,
  date: Date,
  locationID: Number,
  reviewTxt: String,
  cleanliness: Number,
  communication: Number,
  checkin: Number,
  accuracy: Number,
  location: Number,
  value: Number
});
//create model for schema inputs
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;