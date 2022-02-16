//redis client
var redis = require('redis');
var client = redis.createClient({
  'host': 'localhost',
  'port': 6379
});


client.set('foo', 'bar', (err, reply) => {
  if (err) throw err;
  console.log(reply);

  client.get('foo', (err, reply) => {
      if (err) throw err;
      console.log(reply);
  });
});