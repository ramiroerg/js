var phrase = "";
//Contar el numero de palabras

var countText = function(phrase){
	var parr = phrase.split(' ');
	
	return parr.length;

	// seria lo mismo parr = phrase.split(' ').length;
};


var doOperations = function(){
	var sum = 0;
	var numbers = arguments;
	console.log('El Max es: ',getSum(numbers, numbers.length - 1));
};


var getSum = function(nums, index){
	
	var currentNumber = new Number(nums[index]);

	sum = sum + currentNumber;
	if (index == 0)
		return sum;
	return getSum(nums, index - 1);

};

var printDate = function(){
var day = "";

var currentDate = new Date(); 
var currentHour = currentDate.getHours();
//var mer = (currentHour < 12 ) ? 'AM' , 'PM';


console.log ('Today is', calcDay());
console.log ('Current Time is', currentHour);

}


var calcDay = function(){

switch (new Date().getDay()) {
    case 0:
        day = "Sunday";
        break;
    case 1:
        day = "Monday";
        break;
    case 2:
        day = "Tuesday";
        break;
    case 3:
        day = "Wednesday";
        break;
    case 4:
        day = "Thursday";
        break;
    case 5:
        day = "Friday";
        break;
    case 6:
        day = "Saturday";
        break;
}
return day;
}