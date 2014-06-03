var esPalindromo = function(texto){
	if(typeof texto==='string'){
		var palabras = texto.split(" ");
		var sinEspacios = palabras.join("");
		var aux = 0;
		if(sinEspacios.length%2===0){
			aux = sinEspacios.length/2;
		}
		else{
			aux = (sinEspacios.length-1)/2;
		}
		var i = 0;
		var espalindromo = true;
		while (i<aux && espalindromo){
			if(!((sinEspacios.charAt(i)).toLowerCase()===(sinEspacios.charAt(sinEspacios.length-(i+1))).toLowerCase())){
				espalindromo = false;
			}
			i++;
		}
		if(espalindromo){
			console.log("El texto es palíndromo");
		}
		else{
			console.log("El texto no es palíndromo");
		}
	}
}

var esPalindromoSencillo = function(texto){
	//No me funciona, mirar en internet como hacerlo. 
	var palindromo = texto.split("").reverse().join("").split(" ").join("");
	console.log(texto.toLowerCase()===palindromo.toLowerCase());
}

esPalindromoSencillo("Esto no es un palindromo");
esPalindromoSencillo("La ruta nos aporto otro paso natural");
esPalindromoSencillo("Inoren ero ni");
