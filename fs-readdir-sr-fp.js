var fs = require("fs"),
	path = require("path");

var folder_cnt = 0;
var file_cnt = 0;
var imgdir =  'c:\\nodejs\\yoconn\\images'; // added

function list_files(dir){
	//console.log('[+]',dir);
  var files=fs.readdirSync(dir);
  var file_cnt = 0;
	// for (var x in files){ 
	for (var x=0; x<files.length; x++){
			var next =path.join(dir,files[x]);
		if (fs.lstatSync(next).isDirectory()==true) {
      folder_cnt += 1;
      subdir = next;
			list_files(next);
		} else {
      file_cnt += 1;
			console.log('\t',next); //print files with full paths
			//console.log(files) //print filenames without paths			
		}
	  }
  //console.log(file_cnt + ' files in ' + subdir);  
}

//list_files(__dirname); // original line - list files in ALL subdirectories
list_files(imgdir);
module.exports=list_files;

/*
app.get('/images', function(req,res) {
var  imgarray=imgfiles();
res.send(JSON.stringify(imgarray));
});
*/