// var factorial = function (numero) {
	// var aux = numero;
	// for (var i=numero-1;i>0;i--){
		// aux = aux * i;
	// }
	// console.log(aux);
// }
// 
// factorial(5);
// factorial(1);
// factorial(6);

var recursivo = function(numero){
	if(numero===1){
		return 1;
	}
	else{
		var aux = numero * recursivo(numero-1);
		return aux;
	}
}

var factorial = function(numero){
	console.log(recursivo(numero));
}

factorial(5);
factorial(6);
factorial(10);
