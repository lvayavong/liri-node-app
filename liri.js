require("dotenv").config();

var keys = require("./keys.js")
var twitter = require('twitter');
var spotify = require('node-spotify-api');
var spotify = new spotify(keys.spotify);
var client = new twitter(keys.twitter);
var request = require("request");
var command = process.argv[2];
var inquirer = require("inquirer");


function tweetStuff() {
  var params = {
    screen_name: 'PhilonousA'
  };

  client.get('statuses/user_timeline', params, function(error, tweets, response) {

    for (var i = 0; i < tweets.length; i++) {
      console.log(tweets[i].text + " " + tweets[i].created_at);
    }


  });
}
// Still needs to create default song.
function spotifyStuff() {
  inquirer.prompt([

      {
        type: "input",
        name: "username",
        message: "Song or Artist Title",
      },

    ])
    .then(function(inquirerResponse) {
      var songInput = inquirerResponse.username
      spotify.search({
        type: 'track',
        query: songInput
      }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }

        console.log("Artist: " + data.tracks.items[0].artists[0].name);
        console.log("Track: " + data.tracks.items[0].name);
        console.log("Link: " + data.tracks.items[0].external_urls.spotify);
        console.log("Album: " + data.tracks.items[0].album.name);
      });
    });
}
// Still needs to create default movie.
function movieStuff() {

  inquirer.prompt([

      {
        type: "input",
        name: "username",
        message: "Movie Title",
      },

    ])
    .then(function(inquirerResponse) {
      var movieInput = inquirerResponse.username


      request("http://www.omdbapi.com/?t=" + movieInput + "&y=&plot=short&apikey=trilogy", function(error, response, body) {


        if (!error && response.statusCode === 200) {

          console.log("Title: " + JSON.parse(body).Title);
          console.log("Year: " + JSON.parse(body).Year);
          console.log("Imdb: " + JSON.parse(body).imdbRating);
          console.log("Rotten Tomato: " + JSON.parse(body).tomatoUserRating);
          console.log("Country: " + JSON.parse(body).Country);
          console.log("Language: " + JSON.parse(body).Language);
          console.log("Plot: " + JSON.parse(body).Plot);
          console.log("Actors: " + JSON.parse(body).Actors);
        }
      });
    });
}
switch (command) {
  case "my-tweets":
    tweetStuff();
    break;
  case "spotify-this-song":
    spotifyStuff()
    break;
  case "movie-this":
    movieStuff()
    break;
}
