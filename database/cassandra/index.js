const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['127.0.0.1:9042'],
  localDataCenter: 'datacenter1',
  keyspace: 'reviews',
});

//retrieve all reviews for properties
const retrieveReviews = (locationID, callback) => {

  const query = 'SELECT imageurl, user, date, reviewtxt FROM properties WHERE locationid = ?';

  client.execute(query, [ locationID ], { prepare: true }).then(results => {
    results.rows.forEach(review => {
      let imageId = review.imageurl;
      review.imageurl = `https://sdc-user-images.s3.us-east-2.amazonaws.com/user-pic${imageId}.jpg`;
    });
    return results;
  })
    .then((reviews) => {
      callback(null, reviews.rows);
    })
    .catch((err) => {
      callback(err, null);
    });
};

const retrieveRatings = (locationID, callback) => {

  const getAverage = (reviews, cat) => {
    let total = 0;
    reviews.forEach((review) => {
      total += review[cat];
    });
    return Math.floor(total / reviews.length * 10) / 10;
  };
  const query = 'SELECT accuracy, accuracy, cleanliness, communication, location, value FROM properties WHERE locationid = ?';

  client.execute(query, [ locationID ], { prepare: true })
    .then(results => {

      let avgAccuracy = getAverage(results.rows, 'accuracy');
      let avgCheckin = getAverage(results.rows, 'checkin');
      let avgCleanliness = getAverage(results.rows, 'cleanliness');
      let avgCommunication = getAverage(results.rows, 'communication');
      let avgLocation = getAverage(results.rows, 'location');
      let avgValue = getAverage(results.rows, 'value');

      let averageRatings = {
        'Accuracy': avgAccuracy,
        'Check-in': avgCheckin,
        'Cleanliness': avgCleanliness,
        'Communication': avgCommunication,
        'Location': avgLocation,
        'Value': avgValue,
      };

      let overallRating = Math.floor((avgAccuracy + avgCheckin + avgCleanliness +
        avgCommunication + avgLocation + avgValue) / 6 * 100) / 100;

      return [averageRatings, results.rows.length, overallRating];
    })
    .then((ratings) => {
      callback(null, ratings);
    })
    .catch((err) => {
      callback(err, null);
    });
};

module.exports.retrieveReviews = retrieveReviews;
module.exports.retrieveRatings = retrieveRatings;