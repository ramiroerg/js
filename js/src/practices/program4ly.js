// node program2ly.js ./program.js ...\n
//'./program.js'
var fs = require('fs');
var  file = process.argv[2];


fs.readFile(file,function(error,data){
		console.log(data.toString().split('\n').length-1);	
	
});



