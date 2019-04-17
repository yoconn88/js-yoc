var express = require('express'),
    path = require('path'),
    fs = require('fs'),
    formidable = require('formidable'),
    readChunk = require('read-chunk'),
    fileType = require('file-type');

    var readdirp = require('readdirp');
///// var imgfiles=require('./fs-readdir-recur-fullpath');

var app = express();
//var ejs = require('ejs');
// var leaflet = require('leaflet');
//var leafletContextmenu = require("leaflet.contextmenu")

app.set('views', __dirname + '/views');
//app.engine('ejs', engine); // not needed or error
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




app.get('/', function(req, res, next) {
    /**************
     var folders  = fs.readdirSync('images');
    var objArray = [];
    folders.forEach((folder) => {
        var obj    = {};
        var files  = fs.readdirSync('images/' + folder);
        obj.folder = folder;
        obj.files  = files;
        objArray.push(obj);
    });
    //res.render('index_tamil.ejs', { data: JSON.stringify(objArray) });
    console.log(JSON.stringify(objArray));
// need a template to display above in browser
*****************/

var settings = {
    root: './images',
    entryType: 'all'
};

// In this example, this variable will store all the paths of the files and directories inside the providen path
var allFilePaths = [];


// Iterate recursively through a folder
readdirp(settings,
    // This callback is executed everytime a file or directory is found inside the providen path
    function(fileInfo) {
        
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
        //console.log(allFilePaths);
                       return allFilePaths;
    }
);

console.log(allFilePaths);
fileArrayStr = JSON.stringify(allFilePaths);
//res.writeHead(400, {'Content-type':'image/jpg'})
//res.end(fileArrayStr);
//res.render('index_tamil.ejs', { data: JSON.stringify(allFilePaths) });
res.render('listimages.ejs', { photos: JSON.parse(fileArrayStr) });

});

var server = app.listen(3000);
console.log('running on 3000');
