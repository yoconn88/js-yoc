    //include http, fs and url module
var express = require('express');
var app = express();
var http = require('http'),
  fs = require('fs'),
  path = require('path'),
  url = require('url');
  imgDir = 'images/';


var ejs = require('ejs');

 // app.engine('.html', require('ejs').__express);
  app.set('views', __dirname + '/views');
//app.engine('ejs', engine); // not needed or error
app.set('view engine', 'ejs');
 
function filelist(dir){
  var filelist = function(dir) {
    fs.readdir(dir,function(err,list){
        list.forEach(function(file){
             var file2 = path.resolve(dir, file);
            fs.stat(file2,function(err,stats){
                if(stats.isDirectory()) {
                    filelist(file2);
                }
                else {                  
                    console.log(file2);                           
                    
                }
                console.log(file2);               
                
            })
        })
        
        
    });
  };
};
console.log(filelist('imgDir'));
//module.exports = filelist;
//exports.filelist = filelist;

/*
app.get('/images', function(req,res) {
var  imgarray=imgfiles();
res.send(JSON.stringify(imgarray));
});
*/