exports.sum = function(a, b) {
	return(a + b) ;
};

exports.factorial = function(a){
	var fact = 1;
	for (i=1; i<=a ; i++){
	fact = i * fact;

}
		return	fact;
};