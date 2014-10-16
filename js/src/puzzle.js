var myPuzzle = function(){

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
						//console.log(index);
						myMatrix[iRow][iCol] = String.fromCharCode(65+ i);
						pairLetters++;
						isCellReady = true;
					}

				} while (!isCellReady || pairLetters != 2);

			}
			return myMatrix;
	};

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

	Main

	*/
	var  size = matrixSize();


	var matrix = fillMatrix(size);

	var	resultMatrix =new Array(size);
	var tempMatrix =new Array(size);

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
	
	//Compare matrix

	printMatrix(matrix);
	printMatrix(resultMatrix);
	var pares = 0;

	do {
	



		var firstIndex = getIndex('PRIMER', size);

		if (firstIndex != 0) {

			tempMatrix[firstIndex.row][firstIndex.col] = matrix[firstIndex.row][firstIndex.col];
			console.clear();
			printMatrix(tempMatrix);

		}


		var secondIndex = getIndex('SEGUNDO', size);

		if (secondIndex != 0) {

			tempMatrix[secondIndex.row][secondIndex.col] = matrix[secondIndex.row][secondIndex.col];
			console.clear();
			printMatrix(tempMatrix);

		}



		if(firstIndex == 0 && secondIndex == 0){
			console.log('Juego Finalizado');
			return;

		}


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


		for(i=0; i<size; i++){
			for(j=0; j<size; j++){
				tempMatrix[i][j] = resultMatrix[i][j];
			
			}	
		}


	

	} while(pares < ((size*size)/2));

	console.log('Felicidades, terminaste el juego!');

}



