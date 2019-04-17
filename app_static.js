// app.js
var express = require('express');
var path = require('path');
var app = express();

// Define the port to run on
app.set('port', 3000);

app.use(express.static(path.join(__dirname, 'public')));
// Defining a subset of routes To only try and match routes that start with http://localhost:3000/public/
// app.use('/public', express.static(path.join(__dirname + '/public')));

// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});