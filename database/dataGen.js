const faker = require('faker');
const fs = require('fs');
// const csvWriter = require('csv-write-stream');
// let writer = csvWriter();
const start = new Date();



//seed database for 100 random entries
// var reviewCount = 1;

// writer.pipe(fs.createWriteStream('data.csv'));

// for (var i = 1; i < 100; i++) {
//   let randomNum = faker.random.number({ 'min': 15, 'max': 20 });
//   for (var j = 0; j < randomNum; j++) {
//     let randomImgNum = faker.random.number({ 'min': 1, 'max': 1000 });
//     let randomYear = faker.random.number({ 'min': 2013, 'max': 2020 });
//     let randomMonth = faker.date.month();
//     writer.write({
//       imageURL: `https://sdc-user-images.s3.us-east-2.amazonaws.com/user-pic${randomImgNum}.jpg`,
//       user: faker.name.firstName(),
//       date: randomMonth + ' ' + randomYear,
//       locationID: i,
//       reviewTxt: faker.lorem.paragraph(),
//       cleanliness: faker.random.number({ 'min': 0, 'max': 5 }),
//       communication: faker.random.number({ 'min': 0, 'max': 5 }),
//       checkin: faker.random.number({ 'min': 0, 'max': 5 }),
//       accuracy: faker.random.number({ 'min': 0, 'max': 5 }),
//       location: faker.random.number({ 'min': 0, 'max': 5 }),
//       value: faker.random.number({ 'min': 0, 'max': 5 })
//     });
//   }
// }

// writer.end();

// console.log('data generated');

const columns = 'imageURL,user,date,locationID,reviewTxt,cleanliness,communication,checkin,accuracy,location,value\n';

fs.writeFileSync(__dirname + '/data.csv', columns, err => {
  if (err) {
    throw err;
  }
});

const generateReviews = (locationId) => {
  let randomNum = faker.random.number({ 'min': 20, 'max': 30 });
  let allReviews = [];
  for (var j = 0; j < randomNum; j++) {
    let randomImgNum = faker.random.number({ 'min': 1, 'max': 1000 });
    let randomYear = faker.random.number({ 'min': 2013, 'max': 2020 });
    let randomMonth = faker.date.month();
    let review = ''.concat(
      `https://sdc-user-images.s3.us-east-2.amazonaws.com/user-pic${randomImgNum}.jpg,`,
      faker.name.firstName(), ',',
      randomMonth + ' ' + randomYear, ',',
      locationId, ',',
      faker.lorem.paragraph(), ',',
      faker.random.number({ 'min': 0, 'max': 5 }), ',',
      faker.random.number({ 'min': 0, 'max': 5 }), ',',
      faker.random.number({ 'min': 0, 'max': 5 }), ',',
      faker.random.number({ 'min': 0, 'max': 5 }), ',',
      faker.random.number({ 'min': 0, 'max': 5 }), ',',
      faker.random.number({ 'min': 0, 'max': 5 })
    );
    allReviews.push(review);
  }
  return allReviews;
};


const writer = fs.createWriteStream( __dirname + '/data.csv', {flags: 'a'}
);

let i = 10000000;

const writeFile = () => {
  let ok = true;
  do {
    i--;
    let file = generateReviews(i + 1).join('\n') + '\n';
    if (i === 0) {
      writer.write(file, err => {
        console.log((new Date() - start) / 1000, ' seconds for generation');
        if (err) {
          throw err;
        }
      });
    } else {
      ok = writer.write(file, err => {
        if (err) {
          throw err;
        }
      });
    }
  } while (i > 0 && ok);
  if (i > 0) {
    writer.once('drain', writeFile);
  }
};

writeFile();
