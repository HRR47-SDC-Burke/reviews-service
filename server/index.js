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
      res.status(500).end('An Error Occurred');
    } else {
      res.status(200).end('Review Sent');
    }
  });
});

app.get('/api/reviews', (req, res) => {
  let { user, date, locationID } = req.body;
  Review.findOne({ user, date, locationID }, (err, review) => {
    if (err) {
      res.status(404).end('An Error Occurred');
    } else {
      res.status(200).send(review);
    }
  });
});

app.put('/api/reviews/:id', (req, res) => {
  let { user, date } = req.body;
  let update = req.body;
  let locationID = req.params.id;
  Review.update({ user, date, locationID }, { $set: update }, (err, review) => {
    if (err || review.nModified === 0) {
      res.status(500).end('An Error Occurred.');
    } else {
      res.status(200).end('Review Updated');
    }
  });
});

app.delete('/api/reviews/:id', (req, res) => {
  let { user, date } = req.body;
  let locationID = req.params.id;
  Review.remove({ user, date, locationID }, (err, review) => {
    if (err || review.deletedCount === 0) {
      res.status(500).end('An Error Occurred.');
    } else {
      res.status(200).end('Review Deleted');
    }
  });
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});