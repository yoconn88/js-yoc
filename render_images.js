//include http, fs and url module
var express = require('express');
  var app = express();
var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    url = require('url');
    imageDir = 'images/';

  
var ejs = require('ejs');

// app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

var router  = express.Router();
var imgdir = 'images'



router.get('/', function(req, res, next) {
    var folders  = fs.readdirSync(imgedir);
    var objArray = [];
    folders.forEach((folder) => {
        var obj    = {};
        var files  = fs.readdirSync(imgdir + folder);
        obj.folder = folder;
        obj.files  = files;
        objArray.push(obj);
        
    });
    res.render('images2html.ejs', { imagefiles: JSON.stringify(objArray) });
    console.log(objArray[1]);
// need a template to display above in browser
});

app.listen(3000);
//app.listen(3000);
console.log("Server running at http://localhost:3000/");