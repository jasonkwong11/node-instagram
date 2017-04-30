// GRAB THE PACKAGES/VARIABLES WE NEED

var express = require('express');
var ig = require('instagram-node').instagram();

var app = express();

// CONFIGURE THE APP
// =================
// tell node where to look for site resources 
app.use(express.static(__dirname + '/public'));

// set the view engine to ejs
app.set('view engine', 'ejs');

// configure instagram app with client-id, client_secret, and access_token

ig.use({
  // get access token here: http://instagram.pixelunion.net/
  access_token:'YOUR_ACCESS_TOKEN',
})


// SET THE ROUTES
// ===============
// home page routes - our profile's images

app.get('/', function(req, res){
  // use the instagram package to get popular media
  ig.user_self_media_recent(function(err, medias, pagination, remaining, limit){
    // render the home page and pass in the popular image
    res.render('pages/index', { grams: medias });
  });
})

// START THE SERVER
// =================
app.listen(8080)
console.log('App started at localhost:8080!');
