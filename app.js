var fs = require('fs'),
	path = require('path');

var argv = process.argv;
var dir = argv[2];

if(fs.existsSync(dir)){
	if(fs.lstatSync(dir).isDirectory()){
  		var ls = fs.readdirSync(dir);
  	
  		for (var i = 0; i < ls.length; i++){
			var file = ls[i];
			var filepath = path.join(dir, file);
			var folder = 
			path.join(dir, path.extname(file).toLowerCase().replace('.',''));
			var newfilepath = path.join(folder, file);
			if(fs.lstatSync(filepath).isFile()){
				if(fs.existsSync(folder)){
					fs.renameSync(filepath, newfilepath);
				}else{
					fs.mkdirSync(folder);
					console.log('Moving '+filepath+' to '+newfilepath);
					fs.renameSync(filepath, newfilepath);
				}
			}
		}
	}
}else{
	console.log('Invalid directory');
}
