const faker = require('faker');
const fs = require('fs');
const csvWriter = require('csv-write-stream');
let writer = csvWriter();



//seed database for 100 random entries
// var reviewCount = 1;

writer.pipe(fs.createWriteStream('data.csv'));

for (var i = 1; i < 1000000; i++) {
  let randomNum = faker.random.number({ 'min': 15, 'max': 20 });
  for (var j = 0; j < randomNum; j++) {
    let randomImgNum = faker.random.number({ 'min': 1, 'max': 1000 });
    let randomYear = faker.random.number({ 'min': 2013, 'max': 2020 });
    let randomMonth = faker.date.month();
    writer.write({
      imageURL: `https://sdc-user-images.s3.us-east-2.amazonaws.com/user-pic${randomImgNum}.jpg`,
      user: faker.name.firstName(),
      date: randomMonth + ' ' + randomYear,
      locationID: i,
      reviewTxt: faker.lorem.paragraph(),
      cleanliness: faker.random.number({ 'min': 0, 'max': 5 }),
      communication: faker.random.number({ 'min': 0, 'max': 5 }),
      checkin: faker.random.number({ 'min': 0, 'max': 5 }),
      accuracy: faker.random.number({ 'min': 0, 'max': 5 }),
      location: faker.random.number({ 'min': 0, 'max': 5 }),
      value: faker.random.number({ 'min': 0, 'max': 5 })
    });
  }
}

writer.end();

console.log('data generated');