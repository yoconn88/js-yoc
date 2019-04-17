//and your app.js should be like this:

var express = require('express');
var app = express();
var readDirectory = require('./fs-readdir2.js');
app.use(express.static(__dirname + "/public"));

app.get('/images',function(req,res){
    readDirectory.readDirectory(function(imgFiles){
       //res.json({files : imgFiles});
       res.jsonp({files : imgFiles});
       
   });
});

app.listen(3000);
console.log('listen on port 3000');


