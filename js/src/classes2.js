var valDate = function(string){

var reg = new RegExp(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
var reg2 = new RegExp(/-\d{4}-(3[01]|[2][0-9]|0\d)-(1[0-2]|0\[1-9])/);
console.log(reg.test(string));
console.log(reg2.test(string));





};
