const express = require('express');
const app = express();
const port = 3003;
const Review = require('../database/connection.js');
const overallReviews = require('./overallReviews.js');
const cors = require('cors');


app.use(cors())

app.use(express.json());
app.use('/:id', express.static(__dirname + "/../public"));

//get review categories
app.use('/api/overall_reviews', overallReviews);

//get individual reviews
app.get('/api/individual_reviews/:id', (req, res) => {
  Review.find({}, { user: 1, imageURL: 1, date: 1, reviewTxt: 1, _id: 0}, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(results);
    }
  }).where('locationID').equals(req.params.id)
  .sort({ date: -1 });
});

// {
//   "_id" : ObjectId("5f46a7444b86cd31a9aea7de"),
  // "imageURL" : "https://airbnbprojectimages.s3.us-east-2.amazonaws.com/33.jpg",
  // "user" : "Loraine",
  // "date" : ISODate("2018-03-01T05:00:00Z"),
  // "locationID" : 3,  // 1-3
  // "reviewTxt" : "Distinctio necessitatibus aut quo ipsam dolor. Et tempore temporibus nulla. Repellendus laborum ut nesciunt ex accusamus voluptas quasi ut et. Consectetur a sunt corrupti accusantium vitae. Unde eum ipsam nobis assumenda laudantium.", //
  // "cleanliness" : 0, //0-5
  // "communication" : 0, //0-5
  // "checkin" : 1, //0-5
  // "accuracy" : 1, //0-5
  // "location" : 2, //0-5
  // "value" : 3, //0-5
//   "__v" : 0
// }
//NEW CRUD ROUTES

app.post('/api/newReview/', (req, res) => {
  let newReview = new Review(req.body);
  newReview.save((err, review) => {
    if (err) {
      res.send(500).end();
    } else {
      console.log(review);
      res.status(200).end();
    }
  });
});

// app.get();

// app.put();

// app.delete();


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});