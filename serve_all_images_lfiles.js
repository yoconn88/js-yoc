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

//create http server listening on port 3333
//http.createServer(function (req, res) {
app.get('/', function(req, res, next) {
    //use the url to parse the requested url and get the image name
    var query = url.parse(req.url,true).query;
        pic = query.image;
    // if a directory (not a image file), then call getImages function to readdir:
    if (typeof pic === 'undefined') {
        getImages(imageDir, function (err, files) {

            // send images to ejs/html view in browser:
            if(err){ res.render('images2html.ejs', { 
                status: 'Error uploading' }); 
              }
              res.render('images2html.ejs', {
                status: 'Finished uploading',
                  imgfiles: files,
                  imgdir: imageDir
                 });
            
        });
    } else {
        //if a image, read the image using fs and send the image content back in the response
        fs.readFile(imageDir + pic, function (err, content) {
       
            if (err) {
                res.writeHead(400, {'Content-type':'text/html'})
                console.log(err);
                res.end("No such image");    
            } else {
                //specify the content type in the response will be an image
                res.writeHead(200,{'Content-type':'image/jpg'});
              res.end(content);
            }

        });
    };
});

var server = app.listen(3000);
//app.listen(3000);
console.log("Server running at http://localhost:3000/"); // NOT Working, blank screen

//get the list of jpg files in the image dir
function getImages(imageDir, callback) {
    var fileType = '.jpg',
        files = [], i;
    fs.readdir(imageDir, function (err, list) {
        for(i=0; i<list.length; i++) {         
            if(path.extname(list[i]) === fileType) {                
                files.push(list[i]); //store the file name into the array files                      
            }           
        }
        callback(err, files);
        console.log(files);        
    });
}
