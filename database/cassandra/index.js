const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['127.0.0.1:9042'],
  localDataCenter: 'datacenter1',
  keyspace: 'reviews',
});

//******INTIALIZE DATABASE******//

client.execute('CREATE TABLE IF NOT EXISTS test(imageURL int, user text, date text, locationID int, reviewTxt text, cleanliness int, communication int, checkin int, accuracy int, location int, value int, PRIMARY KEY((locationID), user, date))', (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Table created!');
    client.shutdown();
  }
});

//retrieve all reviews for properties
const retrieveReviews = (locationID, callback) => {

  const query = 'SELECT * FROM properties WHERE locationid = ?';

  client.execute(query, [ locationID ], { prepare: true }).then(results => {
    results.rows.forEach(review => {
      let imageId = review.imageurl;
      review.imageurl = `https://sdc-user-images.s3.us-east-2.amazonaws.com/user-pic${imageId}.jpg`;
    });
    return results;
  }).then((reviews) => {
    callback(null, reviews.rows);
  }).catch((err) => {
    callback(err, null);
  });
};

module.exports.retrieveReviews = retrieveReviews;