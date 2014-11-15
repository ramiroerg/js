// node program2ly.js ./program.js ...\n
//'./program.js'
var fs = require('fs');
var  file = process.argv[2];

var fileBuffer = fs.readFileSync(file);
console.log(fileBuffer.toString().split('\n').length-1);
