
require("dotenv").config();

var keyList = require("./keys.js")

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


client.get('statuses/update', function(error, tweet, response) {
  if(error) throw error;
  console.log(tweet);  // Tweet body.
  console.log(response);  // Raw response object.
});
