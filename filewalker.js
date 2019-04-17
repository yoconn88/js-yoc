
var http = require('http');
var express = require('express'),
    path = require('path'),
    fs = require('fs'),
    formidable = require('formidable'),
    readChunk = require('read-chunk'),
    fileType = require('file-type');

///// var imgfiles=require('./fs-readdir-recur-fullpath');
var app = express();
//var ejs = require('ejs');
// var leaflet = require('leaflet');
//var leafletContextmenu = require("leaflet.contextmenu")
var ejs = require('ejs');
// app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// use multiple relative paths:
// app.use(express.static('public'))
// app.use(express.static('files'))

// *** Middleware is the code between req and res:
// __dirname where the executing file located
// process.cwd() - returns the current working directory where the node command is run
// ./ or ../ - if in require(), relative to current execurint file, otherwise same as process.cwd()
// use absolute path if you run express app.js from another directory:
app.use(express.static('views'));
app.use(express.static('public'));
app.use('/images', express.static('images/'));

app.use(express.static('./'));
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Explores recursively a directory and returns all the filepaths and folderpaths in the callback.
 * 
 * @see http://stackoverflow.com/a/5827895/4241030
 * @param {String} dir 
 * @param {Function} done 
 */
//app.get('/', function(req, res, next) {
function filewalker(dir, done) {
    let results = [];

    fs.readdir(dir, function(err, list) {
        if (err) return done(err);

        var pending = list.length;

        if (!pending) return done(null, results);

        list.forEach(function(file){
            file = path.resolve(dir, file);

            fs.stat(file, function(err, stat){
                // If directory, execute a recursive call
                if (stat && stat.isDirectory()) {
                    // Add directory to array [comment if you need to remove the directories from the array]
                    results.push(file);

                    filewalker(file, function(err, res){
                        results = results.concat(res);
                        if (!--pending) done(null, results);
                    });
                } else {
                    results.push(file);

                    if (!--pending) done(null, results);
                }
            });
        });
        
    });
};

app.get('/', function(req, res, next) {
filewalker("./images", function(err, data){
  if(err){
      throw err;
  }
    // ["c://some-existent-path/file.txt","c:/some-existent-path/subfolder"]
  //res.render('template.ejs', { data: JSON.stringify(objArray) });
  console.log(data);

  if(err){ res.render('images2html.ejs', { 
    status: 'Error uploading' }); 
  }
  res.render('images2html.ejs', {
    status: 'Finished uploading',
      imgfiles: data
      
     });
});
});
/*
var server = http.createServer(function(req, res){
  res.writeHead(200,{'Content-Type': 'application/json'});
  res.end(JSON.stringigy(data));
  
});
*/
app.listen(3000);
console.log('3000 is the magic port');
