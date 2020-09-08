const faker = require('faker');
const fs = require('fs');
const start = new Date();

const columns = 'imageURL,user,date,locationID,reviewTxt,cleanliness,communication,checkin,accuracy,location,value\n';

fs.writeFileSync(__dirname + '/data.csv', columns, err => {
  if (err) {
    throw err;
  }
});

const generateReviews = (locationId) => {
  let randomNum = faker.random.number({ 'min': 1, 'max': 3 });
  let allReviews = [];
  for (var j = 0; j < randomNum; j++) {
    let randomImgNum = faker.random.number({ 'min': 1, 'max': 1000 });
    let randomYear = faker.random.number({ 'min': 2013, 'max': 2020 });
    let randomMonth = faker.date.month();
    let review = ''.concat(
      randomImgNum, ',',
      faker.name.firstName(), ',',
      randomMonth + ' ' + randomYear, ',',
      locationId, ',',
      faker.lorem.paragraph(1), ',',
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

let dataAmount = i;

const writeFile = () => {
  let ok = true;
  do {
    i--;
    let file = generateReviews(i + 1).join('\n') + '\n';
    if (i === 0) {
      writer.write(file, err => {
        console.log((new Date() - start) / 1000, ` seconds to generate ${dataAmount} records!`);
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
