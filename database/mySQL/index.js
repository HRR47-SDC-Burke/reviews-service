const mysql = require('mysql');

const con = mysql.createConnection({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'BobChampion1',
  database: process.env.MYSQL_DATABASE || 'reviews'
});

con.connect(function(err) {
  if (err) {
    throw err;
  } else {
    console.log('Connected!');
  }
});

const retrieveReviews = (locationID, callback) => {

  const query = 'SELECT imageurl, user, date, reviewtxt FROM properties WHERE locationid = ?';

  con.query(query, [ locationID ], (err, results) => {
    if (err) {
      callback (err, null);
    } else {
      let format = results.map(review => {
        let imageId = review.imageurl;
        review.imageurl = `https://sdc-user-images.s3.us-east-2.amazonaws.com/user-pic${imageId}.jpg`;
        return review;
      });
      callback(null, format);
    }
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

  con.query(query, [ locationID ], (err, results) => {
    if (err) {
      callback (err, null);
    } else {
      let avgAccuracy = getAverage(results, 'accuracy');
      let avgCheckin = getAverage(results, 'accuracy');
      let avgCleanliness = getAverage(results, 'cleanliness');
      let avgCommunication = getAverage(results, 'communication');
      let avgLocation = getAverage(results, 'location');
      let avgValue = getAverage(results, 'value');

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

      let allRatings = [averageRatings, results.length, overallRating];

      callback(null, allRatings);
    }
  });
};

module.exports.retrieveReviews = retrieveReviews;
module.exports.retrieveRatings = retrieveRatings;