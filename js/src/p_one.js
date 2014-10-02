var max = min = sum = average= 0;

var doOperations = function(){

	var numbers = arguments;
	min = numbers[0];
	sum = max = average = 0;
	console.log('El Max es: ',getMax(numbers, numbers.length - 1));
	console.log('El Min es: ',getMin(numbers,numbers.length -1));
	console.log('La Suma es: ',getSum(numbers, numbers.length-1));
	console.log('El Promedio : ',getAverage(numbers, numbers.length-1));

};

var getMax = function(nums, index){
	
	var currentNumber = nums[index];
	if(currentNumber > max)
		max = currentNumber;
	if(index == 0)
		return max;
	return getMax(nums, index - 1);
}


var getMin = function(nums, index){	
	
	var currentNumber = nums[index];
	if (currentNumber < min) 
		min = currentNumber;
	if (index == 0 )
		return min;
	return getMin(nums, index - 1);
}

var getSum = function(nums, index){
	
	var currentNumber = nums[index];
	sum = sum + currentNumber;
	if (index == 0)
		return sum;
	return getSum(nums, index - 1);

}

var getAverage = function(nums,index) {

	var currentNumber = nums[index];
	average = average + currentNumber;
	if (index == 0){
		average = average / (nums.length)
		average = average.toFixed(2);
		return average;
	}
	return getAverage(nums, index - 1);
}