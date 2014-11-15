(function(){

	var collectWords = function (){
		var wordsCollection = [];
		do{
			var words = prompt('Please feed our word database with a paragraph');
		} while(words==''|| words.length <=3);
		wordsCollection = words.split(' ');
		return wordsCollection;
	}

	var randomWord = function(warray){
		var index = 0;
		var text = '';
		index = Math.floor((Math.random() * warray.length));
		do {
			if (warray[index].length > 3) {
				text = warray[index];
				return text;
				console.log(text);
			};
		

		} while (warray[index].length <= 3);
	}



	var play = function(text){
		var result = tempResult = [];
		var attemps = 0;
		result = text.split('');
		//console.log(result);
		console.clear();

		for (i=0;i<result.length;i++){
			tempResult[i] = '_'
		}
		printWord(tempResult);

		do{
			var myGuess = prompt('Please enter a letrer to guess or the complete word');

			if (myGuess.length == 1){
				for (i=0;i<result.length;i++){
					if(result[i] == myGuess){
						tempResult[i] = result[i];
					}
				}

				if (tempResult.indexOf('_')==-1){
					console.clear();
					printWord(result);
					console.log('You win!');
					return;
				};

				console.clear();
				printWord(tempResult);
				console.log('Number of attemps: '+ (attemps +1)  + ' of 10');
			} else if (myGuess == text){	
				printWord(result);
				console.log('You win!');
				return;
			}

			attemps++;
		} while(attemps<10);
		console.log('Game Over');




	}



	var printWord = function(array){
		var  printText = '';

		for (i=0;i<array.length;i++)
			printText = printText + ' ' + array[i];

		console.log(printText);


	}

	do {
		console.log('Please enter a number:');
		console.log('1: Feed words collection; 2:Play; 3:Quit');
		var option = prompt('Select an option from the menu','1');
		option = parseInt(option);

		if(option == 1){
			var myWords = collectWords();
			var word = randomWord(myWords);
		}

		if (option==2){
			play(word);

		};

		
} while(option!=3);
})();