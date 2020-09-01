const express = require('express');
const router = express.Router();
const Review = require('../database/connection.js');

//Render overall Rating bars//LEGACY CODE
router.get("/:id", (req, res) => {
  let objWithColumnArrays = {};

  Review.find({}, { cleanliness: 1, _id: 0}, (err, results) => {
    if(err) {
      res.status(500).send(err);
    }
    else {
      let cleanlinessReviews = results.map((review) => {
        return review.cleanliness;
      });

      Review.find({}, { accuracy: 1, _id: 0}, (err, results) => {
        if(err) {
          res.status(500).send(err);
        }
        else {
          let accuracyReviews = results.map((review) => {
            return review.accuracy;
          })
          Review.find({}, { communication: 1, _id: 0}, (err, results) => {
            if(err) {
              res.status(500).send(err);
            }
            else {
              let communicationReviews = results.map((review) => {
                return review.communication;
              })
              Review.find({}, { checkin: 1, _id: 0}, (err, results) => {
                if(err) {
                  res.status(500).send(err);
                }
                else {
                  let checkinReviews = results.map((review) => {
                    return review.checkin;
                  })
                  Review.find({}, { location: 1, _id: 0}, (err, results) => {
                    if(err) {
                      res.status(500).send(err);
                    }
                    else {
                      let locationReviews = results.map((review) => {
                        return review.location;
                      })
                      Review.find({}, { value: 1, _id: 0}, (err, results) => {
                        if(err) {
                          res.status(500).send(err);
                        }
                        else {
                          let valueReviews = results.map((review) => {
                            return review.value;
                          })
                          function getAverage (category) {
                            let average = 0;
                            for (var i = 0; i < category.length; i++) {
                              average += category[i];
                            }
                            return Math.floor((average/category.length) *10) / 10;
                          };
                          objWithColumnArrays['Cleanliness'] = getAverage(cleanlinessReviews);
                          objWithColumnArrays['Accuracy'] = getAverage(accuracyReviews);
                          objWithColumnArrays['Communication'] = getAverage(communicationReviews);
                          objWithColumnArrays['Check-in'] = getAverage(checkinReviews);
                          objWithColumnArrays['Location'] = getAverage(locationReviews);
                          objWithColumnArrays['Value'] = getAverage(valueReviews);
                          let totalAvg = 0;
                          let numberOfCategories = 0;
                          for (let categories in objWithColumnArrays) {
                            totalAvg += objWithColumnArrays[categories];
                            numberOfCategories++;
                          }
                          res.send([objWithColumnArrays, cleanlinessReviews.length, Math.floor(totalAvg/numberOfCategories * 100) / 100]);
                        }
                      })
                      .where('locationID').equals(req.params.id);
                    }
                  })
                  .where('locationID').equals(req.params.id);
                }
              })
              .where('locationID').equals(req.params.id);
            }
          })
          .where('locationID').equals(req.params.id);
        }
      })
      .where('locationID').equals(req.params.id);
    }
  })
  .where('locationID').equals(req.params.id);
});

//ORFER REVIEWS BY MOST RECENT
const reviewSort = (reviews) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May',
    'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  reviews.map(review => {
    let order = Number(review.date.slice(-2)) +
    Number(months.indexOf(review.date.slice(0, 3))) / 10;
    review.order = order;
    return review;
  });

  return reviews.sort((a, b) => b.order - a.order);
};


module.exports.router = router;
module.exports.reviewSort = reviewSort;
