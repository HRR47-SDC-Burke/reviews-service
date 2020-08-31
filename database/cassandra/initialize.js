const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['127.0.0.1:9042'],
  localDataCenter: 'datacenter1',
});

//******INTIALIZE DATABASE******//

client.execute("CREATE KEYSPACE IF NOT EXISTS " +
"test WITH replication = {'class': 'SimpleStrategy'," +
" 'replication_factor': '1' }", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Keyspace created');
    client.execute('USE test', (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Using keyspace: test');
        client.execute('CREATE TABLE IF NOT EXISTS ' +
        'reviews(imageURL int, user text, date text, ' +
        'locationID int, reviewTxt text, cleanliness int, ' +
        'communication int, checkin int, accuracy int, location int,' +
        ' value int, PRIMARY KEY((locationID), user, date))', (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log('Table created!');
            client.shutdown();
          }
        });
      }
    });
  }
});
