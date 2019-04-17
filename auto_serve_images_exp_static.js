//Since you are saving the images in public/images folder, you can take advantage of express.static for serving these newly uploaded files automatically.

var express = require('express');
var multer = require("multer")

var app = express();

//all static contents inside the given folder will be accessible
//e.g. http://example.com/public/uploads/test.png
app.use(express.static(__dirname+'/public/uploads'));

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname+'/public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+file.originalname)
  }
});

app.post('/add/details', upload.any(), function(req,res){
  var data = req.body;
  // path of uploaded file.
  data.propic = '/public/uploads/'+req.files[0].filename;
  res.render('index',{
     "data": data
  });
});

// Assume that you are using jade as view engine, you can embed img as following:

img(src='/'+data.propic) // it's equivalent to http://example.com/public/uploads/test.png