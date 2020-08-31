DROP DATABASE IF EXISTS reviews;

CREATE DATABASE reviews;

USE reviews;

CREATE TABLE properties (
  id INT NOT NULL AUTO_INCREMENT,
  imageurl int NOT NULL,
  user varchar(20) NOT NULL,
  date varchar(20) NOT NULL,
  locationid int NOT NULL,
  reviewtxt varchar(200) NOT NULL,
  cleanliness int NOT NULL,
  communication int NOT NULL,
  checkin int NOT NULL,
  accuracy int NOT NULL,
  location int NOT NULL,
  value int NOT NULL,
  PRIMARY KEY (ID),
  KEY locationid (locationid);
);

