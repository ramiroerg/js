var calculator = require('./calculator');
describe('calculator', function(){

	it('should add two numbers', function(){

		var actualRes = calculator.sum(1,2);
		var expectRes = 3;

		expect(actualRes).toBe(expectRes);
	});


	it('should calc the fact of a number', function(){

		var actualRes = calculator.factorial(5);
		var expectRes = 120;

		expect(actualRes).toBe(expectRes);
	});

});