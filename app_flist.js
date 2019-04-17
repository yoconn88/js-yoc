

  var express = require('express');
  var app = express();
  var http = require('http');
  var fs = require('fs');
  var path = require("path");
  var readdirp = require('readdirp');
  //var flist = require('./fs-readdir-ar-fp.js');
  app.use(express.static(__dirname + "/public"));

 
  var filelist = function(dir) {      
    fs.readdir(dir,function(err,list){
        list.forEach(function(file){
             var file2 = path.resolve(dir, file);
            fs.stat(file2,function(err,stats){
                if(stats.isDirectory()) {
                    filelist(file2);
                
                }
                else {                  
                    //console.log(file2); // <-- data is displayed on console
                        return;    
                        
                        fs.writeFile('imgfile.json', file2, 'utf8', callback);
                        return;
                }
            })            
        })      
    })   
};


  flistArr = filelist('images');
  console.log(flistArr); // <-- No data is displayed on console???

var server = http.createServer(function(req, res){
    res.writeHead(200,{'Content-Type': 'application/json'});
    res.end(JSON.stringigy(file2));
});

app.listen(3000);
console.log('3000 is the magic port');

