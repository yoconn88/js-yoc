// Import the module
var express = require('express');
  var app = express();
var readdirp = require('readdirp');
var ejs = require('ejs');

// app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

var settings = {
    root: './images',
    entryType: 'all'
};

// In this example, this variable will store all the paths of the files and directories inside the providen path
var allFilePaths = [];
// Iterate recursively through a folder
// This callback is executed everytime a file or directory is found inside the providen path
readdirp(settings, function(fileInfo) {   
        // Store the fullPath of the file/directory in our custom array 
        allFilePaths.push(
            fileInfo.fullPath
        );
    }, 
    // This callback is executed once 
    function (err, res) {
        if(err){
            throw err;
        }
        // An array with all the fileEntry objects of the folder 
           console.log(allFilePaths);

    }
);

console.log(allFilePaths);

var server = app.listen(3000);
//app.listen(3000);
console.log("Server running at http://localhost:3000/"); // NOT Working, blank screen
