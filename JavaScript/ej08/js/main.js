var parOimpar = function (numero) {
	// if(numero%2===0){
		// console.log("Es un número par");
		// return "Es un número par"
	// }
	// else{
		// console.log("Es un número impar");
		// return "Es un número impar"
	// }
	return (numero%2)===0;
}

console.log("El número 10 es par? " + parOimpar(10));
console.log("El número 9 es par? " + parOimpar(9));