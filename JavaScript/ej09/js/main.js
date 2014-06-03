var esMayuscula = function(letra){
	var mayusculas = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','Ñ','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
	var encontrado = false;
	var ind = 0;
	while(ind<mayusculas.length && !encontrado){
		if(letra===mayusculas[ind]){
			encontrado = true;
		}
		ind++;
	}
	return encontrado;
}

var mayusOminus = function(texto){
	if(typeof texto == 'string'){
		var numMayus = 0;
		for(var i=0;i<texto.length;i++){
			if(esMayuscula(texto.charAt(i))){
				numMayus = numMayus + 1;
			}
			
		}
		if(numMayus===0){
			console.log("La palabra contiene solo minúsculas");
		}
		else if(numMayus===texto.length){
			console.log("La palabra contiene solo mayúsculas");
		}
		else{
			console.log("La palabra contiene mayúsculas y minúsculas");
		}
	}
}

var mayusOminusSimple = function(texto){
	if(typeof texto == 'string'){
		var mayusculas = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','Ñ','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
		var numMayus = 0;
		for(var i=0;i<texto.length;i++){
			if(texto.charAt(i) in mayusculas){
				numMayus = numMayus + 1;
			}
		}
		if(numMayus===0){
			console.log("La palabra contiene solo minúsculas");
		}
		else if(numMayus===texto.length){
			console.log("La palabra contiene solo mayúsculas");
		}
		else{
			console.log("La palabra contiene mayúsculas y minúsculas");
		}
	}
}

var mayusOminusSencillo = function(texto){
	var mayus = texto.toUpperCase();
	var minus = texto.toLowerCase();
	if(minus===texto){
		console.log("La palabra contiene solo minúsculas");
	}
	else if(mayus===texto){
		console.log("La palabra contiene solo mayúsculas");
	}
	else{
		console.log("La palabra contiene mayúsculas y minúsculas");
	}
}

mayusOminusSencillo("MAYUSCULAS");
mayusOminusSencillo("minusculas");
mayusOminusSencillo("MeZCLadOs");
