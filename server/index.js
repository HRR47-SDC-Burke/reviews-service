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

app.post('/api/reviews', (req, res) => {
  let newReview = new Review(req.body);
  newReview.save((err, review) => {
    if (err) {
      res.send(500).end();
    } else {
      res.status(200).end('Review Sent');
    }
  });
});

app.get('/api/reviews', (req, res) => {
  let userName = req.body.user;
  let stayDate = req.body.date;
  let location = req.body.locationID;
  Review.findOne({
    user: userName,
    date: stayDate,
    locationID: location
  }, (err, review) => {
    if (err) {
      res.send('An Error Occurred');
    } else {
      res.send(review);
    }
  });
});

app.put('/api/reviews/:id', (req, res) => {
  let update = req.body;
  let userName = req.body.user;
  let stayDate = req.body.date;
  let location = req.params.id;
  Review.update({ user: userName, date: stayDate, locationID: location }, { $set: update }, (err, review) => {
    if (err || review.nModified === 0) {
      res.send('An Error Occurred.');
    } else {
      res.send('Review Updated');
    }
  });
});

app.delete('/api/reviews/:id', (req, res) => {
  let userName = req.body.user;
  let stayDate = req.body.date;
  let location = req.params.id;
  Review.remove({ user: userName, date: stayDate, locationID: location }, (err, review) => {
    if (err || review.deletedCount === 0) {
      res.send('An Error Occurred.');
    } else {
      res.send('Review Deleted');
    }
  });
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});