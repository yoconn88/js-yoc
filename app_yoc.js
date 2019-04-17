var express = require('express');
var path = require('path');
var app = express();
///// var imgfiles=require('./fs-readdir-recur-fullpath');

// var leaflet = require('leaflet');
//var leafletContextmenu = require("leaflet.contextmenu")

// Define the port to run on
app.set('port', 3000);
// use multiple relative paths:
// app.use(express.static('public'))
// app.use(express.static('files'))


// __dirname where the executing file located
// process.cwd() - returns the current working directory where the node command is run
// ./ or ../ - if in require(), relative to current execurint file, otherwise same as process.cwd()
// use absolute path if you run express app.js from another directory:
app.use(express.static(path.join(__dirname, 'public')));

//Serves all the request which includes /images in the url from Images folder
app.use('/images', express.static(__dirname + '/Images'));

// Router. res.render can be used also
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/resp_topnav_yoc_w_tmpl.html'));
  
});

/*
app.get('/images', function(req,res) {
var  imgarray=imgfiles();
res.send(JSON.stringify(imgarray));
});
*/
//Search for mdn json then jquery/ajax call from client


// The "/tmp" directory must be exist for cache stream data.
// using node-gallery -- the module name in node_modules folder.

var imgdir = "/images"
app.use(imgdir, require('node-gallery')({
  staticFiles : 'images',
  urlRoot : 'images', 
  title : ''
}));




// Listen for requests

var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});


//====================
