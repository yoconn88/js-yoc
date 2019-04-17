const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

var ejs = require('ejs');
// app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'pug');
app.use(express.static('views'));
app.use(express.static('public'));
//app.use('/', express.static('public'));


// for auto gallery:
//app.use('/static', express.static(path.join(__dirname,'uploads')))

app.get('/get-images', (req, res) => {
    let images = getImagesFromDir(path.join(__dirname, 'images'));
    res.render('images2html.ejs', {imgfiles: images});
    
});


function getImagesFromDir(dirPath) {
    let alImages = [];
    let files = fs.readdirSync(dirPath);
    for (file of files) {
        let fileLocation = path.join(dirPath, file);
        var stat = fs.statSync(fileLocation);
        if (stat && stat.isDirectory()) {
            getImagesFromDir(fileLocation);
        } else 
            if (stat && stat.isFile() && ['.jpg', '.png'].indexOf(path.extname(fileLocation)) != -1) 
            {
                allImages.push('static/'+file); //push all images to allImages
            }
        }
        return allImages;
    }
    
    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, 'views/auto_gallery.html'));
    });

app.listen(3000, function () {
    console.log(`Express is running at : localhost:3000`);
});


