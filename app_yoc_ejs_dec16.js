var express = require("express"),
  app = express(),
  path = require("path"),
  fs = require("fs"),
  formidable = require("formidable"),
  readChunk = require("read-chunk"),
  fileType = require("file-type"),
  http = require("http"),
  url = require("url");

///// var imgfiles=require('./fs-readdir-recur-fullpath');

var ejs = require("ejs");
// app.engine('.html', require('ejs').__express);
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

//var ejs = require('ejs');
// var leaflet = require('leaflet');
//var leafletContextmenu = require("leaflet.contextmenu")

// use multiple relative paths:
// app.use(express.static('public'))
// app.use(express.static('files'))

// *** Middleware is the code between req and res:
// __dirname where the executing file located
// process.cwd() - returns the current working directory where the node command is run
// ./ or ../ - if in require(), relative to current exec file, otherwise same as process.cwd()
// use absolute path if you run express app.js from another directory:

app.use(express.static("views"));
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
//app.use('/images', express.static('images'));

app.use(express.static("./"));
//app.use(express.static(path.join(__dirname, 'public')));

//Serves all the request which includes /images in the url from Images folder
//app.use('/gallery', express.static(__dirname + '/Images'));

// *** Router:
// Render home page view
app.get("/", (req, res) => {
  // render `home.ejs` with the list of posts
  //res.render('home', { posts: posts })
  res.render("map_home.ejs");
});

// http://localhost:3000/gallery
/*
app.get('/gallery', (req,res) => {
  res.render('partials/blueimages.ejs')
})

/********************************************************* */
// Serve All Images from Folders:
var imageDir = "images/";
app.get("/gallery", function(req, res, next) {
  //use the url to parse the requested url and get the image name
  var query = url.parse(req.url, true).query;
  pic = query.image;
  // if a directory (not a image file), then call getImages function to readdir:
  if (typeof pic === "undefined") {
    getImages(imageDir, function(err, files) {
      // send images to ejs/html view in browser:
      if (err) {
        res.render("partials/blueimages.ejs", {
          status: "Error uploading"
        });
      }
      res.render("partials/blueimages.ejs", {
        status: "Finished uploading",
        imgfiles: files,
        imgdir: imageDir
      });
    });
  } else {
    //if a image, read the image using fs and send the image content back in the response
    fs.readFile(imageDir + pic, function(err, content) {
      if (err) {
        res.writeHead(400, {
          "Content-type": "text/html"
        });
        console.log(err);
        res.end("No such image");
      } else {
        //specify the content type in the response will be an image
        res.writeHead(200, {
          "Content-type": "image/jpg"
        });
        res.end(content);
      }
    });
  }
});

//get the list of jpg files in the image dir
function getImages(imageDir, callback) {
  var fileType = ".JPG",
    files = [],
    i;
  fs.readdir(imageDir, function(err, list) {
    for (i = 0; i < list.length; i++) {
      if (path.extname(list[i]) === fileType) {
        //var fullPathFiles = path.resolve(imageDir, list[i]);
        //files.push(fullPathFiles);
        files.push(list[i]); //store the file name into the array files
      }
    }
    callback(err, files);
    //console.log(files);
  });
}
/********************************************************************************* */
/* Example to Pass array to ejs view:
app.get('/', function(req, res){ 
    res.render('index',{users : [
              { name: 'John' },
              { name: 'Mike' },
              { name: 'Samantha' }
    ]});
  });
 
  app.get('/', function(req, res) {
    var drinks = [
        { name: 'Bloody Mary', drunkness: 3 },
        { name: 'Martini', drunkness: 5 },
        { name: 'Scotch', drunkness: 10 }
    ];
    var tagline = "Any code of your own that you haven't looked at for six or more months might as well have been written by someone else.";

    res.render('pages/index', {
        drinks: drinks,
        tagline: tagline
    });
});
  */
app.get("/photo-books", (req, res) => {
  res.render("w3-photo-callapsenav.ejs");
});

app.get("/News", (req, res) => {
  res.render("News.ejs");
});

app.get("/reuters-world-news", (req, res) => {
  res.render("reuters_world_news.ejs");
});

app.get("/social", (req, res) => {
  res.render("w3-social-template.ejs");
});

app.get("/chat", (req, res) => {
  res.render("w3-chat-message.ejs");
});

app.get("/blog", (req, res) => {
  res.render("w3-blog-template.ejs");
});

app.get("/mail", (req, res) => {
  res.render("w3-mail-template.ejs");
});

app.get("/login", (req, res) => {
  res.render("w3-login-template.ejs");
});

app.get("/signup", (req, res) => {
  res.render("w3-signup-template.ejs");
});
//***************************************************************
// Display image albums from directory and subdirectories recursively:
// The "/tmp" directory must be exist for cache stream data.
// using node-gallery -- the module name in node_modules folder.

// http://localhost:3000/albums
var imagesdir = "/albums";
app.use(
  imagesdir,
  require("node-gallery")({
    staticFiles: "albums",
    urlRoot: "albums",
    title: ""
  })
);

/****************************************************
 * Index route to display upload form - tamil code
 */

app.get("/upload_photos", function(req, res) {
  // Don't bother about this :)
  var filesPath = path.join(__dirname, "uploads/");
  fs.readdir(filesPath, function(err, files) {
    if (err) {
      console.log(err);
      return;
    }

    files.forEach(function(file) {
      // check file for existance before file open:
      fs.stat(filesPath + file, function(err, stats) {
        if (err) {
          console.log(err);
          return;
        }

        var createdAt = Date.parse(stats.ctime),
          days = Math.round((Date.now() - createdAt) / (1000 * 60 * 60 * 24));

        if (days > 1) {
          fs.unlink(filesPath + file);
        }
      });
    });
  });
  res.render("upload_photos.ejs");
  //res.sendFile(path.join(__dirname, 'views/index_tamil.html'));
});

/**
 * Upload photos route.
 */

app.post("/upload_photos", function(req, res) {
  var photos = [],
    form = new formidable.IncomingForm();
  // above line creates a new incoming form.

  // Tells formidable that there will be multiple files sent in an array.
  form.multiples = true;

  // Sets the directory for placing file uploads in. You can move them later on using fs.rename().
  // The default is os.tmpdir().
  form.uploadDir = path.join(__dirname, "tmp_uploads");

  // Invoked when a file has finished uploading.
  form.on("file", function(name, file) {
    // Allow only 3 files to be uploaded.
    /*
      if (photos.length === 3) {
          fs.unlink(file.path);
          return true;
      }
      */

    var buffer = null,
      type = null,
      filename = "";

    // Read a chunk of the file.
    buffer = readChunk.sync(file.path, 0, 262);
    // Get the file type using the buffer read using read-chunk
    type = fileType(buffer);

    // Check the file type, must be either png,jpg or jpeg
    if (
      type !== null &&
      (type.ext === "png" || type.ext === "jpg" || type.ext === "jpeg")
    ) {
      // Assign new file name
      filename = Date.now() + "-" + file.name;

      // Move the file with the new file name
      fs.rename(file.path, path.join(__dirname, "uploads/" + filename));

      // Add to the list of photos
      photos.push({
        status: true,
        filename: filename,
        type: type.ext,
        publicPath: "uploads/" + filename
      });
    } else {
      photos.push({
        status: false,
        filename: file.name,
        message: "Invalid file type"
      });
      fs.unlink(file.path);
    }
  });

  form.on("error", function(err) {
    console.log("Error occurred during processing - " + err);
  });

  // Invoked when all the fields have been processed.
        form.on("end", function() {
    console.log("All the request fields have been processed.");
  });

  // Parses an incoming node.js request containing form field data:
  form.parse(req, function(err, fields, files) {
    // returns json file of photos like JSON.stringigy():
    res.status(200).json(photos);
  });
});

app.get("/tutorials", (req, res) => {
  res.render("youtube_tutorials.ejs");
  //res.render('gen_ytube_thumbnails.ejs')
});

app.get("/musics", (req, res) => {
  res.render("youtube_musics.ejs");
});
/********************************************************** */

// Listen for requests
// Define the port to run on
/*
app.set('port', 3000);
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});
*/

/******************************************************** */
app.listen(3000);
console.log("3000 is the magic port");
//====================
