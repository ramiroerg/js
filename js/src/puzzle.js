var myPuzzle = function(){

   	/**
     * Get the size of the matrix for the game
     * @return {int} the size of the matrix
     */
	var matrixSize = function(){
		do {
			var n = prompt('Ingrese el tamaño de la tabla que quiere crear (por dejefcto creara una tabla 4x4)');
			
			if(n == null){
				n= 4;
			}
			n = parseInt(n);
		} while((n % 2) != 0);
		return n;
	};


	 /**
     * fill the matrix with random letter, pair letters
     * @param {int} size of the matrix
     */
	var fillMatrix = function(n){
		var iRow = iCol = letterInt = 0;
		var myMatrix=new Array(n);
		//2 dimention array
		for (i=0; i <n; i++)
		myMatrix[i]=new Array(n)

		//build the matrix
		for(i=0; i<n; i++){
			for(j=0; j<n; j++){
				myMatrix[i][j] = null;				
			}	
		}
		
			for (i = 0 ; i < (n * (n/2)) ; i++) {
				var isCellReady = false;
				var pairLetters = 0;

				do  {
					iRow = Math.floor((Math.random() * n)) ;
					iCol = Math.floor((Math.random() * n)) ;

					if (myMatrix[iRow][iCol] == null){
						myMatrix[iRow][iCol] = String.fromCharCode(65+ i);
						pairLetters++;
						isCellReady = true;
					}

				} while (!isCellReady || pairLetters != 2);

			}
			return myMatrix;
	};


	 /**
     * Print the matrix in the console
     * @param {array} matrix to print
     */
	var printMatrix = function(m)
	{
		var printText = indexHeader = '';

		for (i=0; i < m.length; i++){

			indexHeader += '   ' + i;
		}

		console.log('   ' + indexHeader);

		for (i=0; i < m.length; i++){

			for (j=0; j < m.length; j++){			
			
				printText = printText + ' | ' + m[i][j];
			}

			console.log(i + '  ' + printText);
			printText = '';

		}
		console.log('');

		

	};

	 /**
     * Get coordinates from the user
     * @param {text} text for the message {int} size of the matrix
     * @return {in} when user don't enter a value {object} return an object with the coordinates 
     */

	var  getIndex = function(text,s)
	{
		//Get cords and validate
		do
		{
			var input = prompt('Insert los indices del '+text+' valor separados por coma (fila,columna)','1,0');
			if (input == null){
				return 0;
			}
			
			var regValidation = new RegExp('^[0-'+s+'],[0-'+s+']$'); 

		} while(regValidation.test(input)==false);

		var index = input.split(',');
		var row = parseInt(index[0]);
		var col = parseInt(index[1]);
		return {row : row, col : col};

	};


	/*
	* Main
	*/
	var size = matrixSize(); //size of the matrix
	var matrix = fillMatrix(size); //Matrix with the original data to compare with
	var	resultMatrix =new Array(size); //Results original filled with *
	var tempMatrix =new Array(size); //Temporal Matrix to shown teporal results

	for (i=0; i <size; i++){
		resultMatrix[i]=new Array(size)
		tempMatrix[i]=new Array(size)
	}

	for(i=0; i<size; i++){
		for(j=0; j<size; j++){
			resultMatrix[i][j] = '*';
			tempMatrix[i][j] = '*';		
		}	
	}
	
	// Commenting the matrix with the results
	//printMatrix(matrix);
	printMatrix(resultMatrix);
	var pares = 0;
	do {
		//Get the first index
		var firstIndex = getIndex('PRIMER', size);
		if (firstIndex != 0) {
			tempMatrix[firstIndex.row][firstIndex.col] = matrix[firstIndex.row][firstIndex.col];
			console.clear();
			printMatrix(tempMatrix);
		}

		//Get the second index
		var secondIndex = getIndex('SEGUNDO', size);
		if (secondIndex != 0) {
			tempMatrix[secondIndex.row][secondIndex.col] = matrix[secondIndex.row][secondIndex.col];
			console.clear();
			printMatrix(tempMatrix);
		}

		//End the game if the user didn't enter both fields
		if(firstIndex == 0 && secondIndex == 0){
			console.log('Juego Finalizado');
			return;
		}

		//	update right results
		if(firstIndex != 0 && secondIndex != 0){
			var sameIndex = false;
			if (firstIndex.row == secondIndex.row && firstIndex.col == secondIndex.col ) {
			sameIndex = true;
			};
			if (matrix[firstIndex.row][firstIndex.col]==matrix[secondIndex.row][secondIndex.col] && !sameIndex){
				resultMatrix[firstIndex.row][firstIndex.col] = matrix[firstIndex.row][firstIndex.col];
				resultMatrix[secondIndex.row][secondIndex.col] = matrix[secondIndex.row][secondIndex.col];
				pares++;
				console.log('Muy bien!');
			}
		}

		//Clean temporal matrix
		for(i=0; i<size; i++){
			for(j=0; j<size; j++){
				tempMatrix[i][j] = resultMatrix[i][j];		
			}	
		}


	} while(pares < ((size*size)/2));
	console.log('Felicidades, terminaste el juego!');
}



