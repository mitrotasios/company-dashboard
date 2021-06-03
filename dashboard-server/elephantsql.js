var pg = require('pg');
var conString = "postgres://puvkuukt:M2Si94WOw3aJUGpwqy3Uova3oURmYo6t@tai.db.elephantsql.com/puvkuukt"
var client =  new pg.Client(conString);

client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  client.query('SELECT NOW() AS "theTime"', function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
  });

});

module.exports = client;