// const cassandra = require('cassandra-driver');








// CREATE TABLE properties(imageURL text, user text, date text, locationID int, reviewTxt text, cleanliness int, communication int, checkin int, accuracy int, location int, value int, PRIMARY KEY((locationID), user, date));

// INSERT INTO properties(imageURL, user, date, locationID, reviewTxt, cleanliness, communication, checkin, accuracy, location, value) VALUES ('https://sdc-user-images.s3.us-east-2.amazonaws.com/user-pic458.jpg', 'Carlo', '2014-04-01T04:00:00Z', 1, 'Possimus adipisci consectetur maxime eos aspernatur. Nihil provident atque commodt voluptatibus expedita ipsam quasi saepe aliquid sequi. Exercitationem odit quo facilis eum repellat.', 0, 2, 4, 2, 5, 1);

// INSERT INTO properties(imageURL, user, date, locationID, reviewTxt, cleanliness, communication, checkin, accuracy, location, value) VALUES ('https://sdc-user-images.s3.us-east-2.amazonaws.com/user-pic813.jpg', 'Deon', '2018-02-01T05:00:00Z', 1, 'Optio aliquam et modi debitis non perspiciatis. Sed sit quasi tempore totam occaecati. Odit blanditiis necessitatibus placeat. Similique officia possimus harum.', 1, 3, 1, 2, 3, 5);

// { "_id" : ObjectId("5f4817bfabbdec664a1bb32e"), "imageURL" : "https://sdc-user-images.s3.us-east-2.amazonaws.com/user-pic813.jpg", "user" : "Deon", "date" : ISODate("2018-02-01T05:00:00Z"), "locationID" : 3, "reviewTxt" : "Optio aliquam et modi debitis non perspiciatis. Sed sit quasi tempore totam occaecati. Odit blanditiis necessitatibus placeat. Similique officia possimus harum.", "cleanliness" : 1, "communication" : 3, "checkin" : 1, "accuracy" : 2, "location" : 3, "value" : 0, "__v" : 0 }


// COPY properties (imageURL, user, date, locationID, reviewTxt, cleanliness, communication, checkin, accuracy, location, value) FROM 'data.csv' with header=true;

// NODE_OPTIONS=--max-old-space-size=8192

// node --max-old-space-size=8192 database/dataGen.js

