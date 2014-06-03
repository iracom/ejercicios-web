var valores = [true,5,false,"hola","adios",2];

var numeros = [];
var booleanos = [];
var caracteres = [];

// for (i in valores){
	// if (typeof valores[i] == 'number'){
		// numeros.push(valores[i]);
	// }
	// else if (typeof valores[i] == 'boolean'){
		// booleanos.push(valores[i]);
	// }
	// else {
		// caracteres.push(valores[i]);
	// }
// }

for(i in valores){
	switch(typeof valores[i]){
		case 'number': numeros.push(valores[i]); break;
		case 'boolean': booleanos.push(valores[i]); break;
		case 'string': caracteres.push(valores[i]); break;
	}
}

console.log(numeros);
console.log(booleanos);
console.log(caracteres);

var mayor = caracteres[0];
for (var j=1; j<caracteres.length;j++){
	if(caracteres[j].length>mayor.length){
		mayor = caracteres[j];
	}
}
console.log("Texto mayor: " + mayor);

console.log("Operador OR: " + (booleanos[0] || booleanos[1]));
console.log("Operador AND: " + (booleanos[0] && booleanos[1]));

var suma = 0;
suma = numeros[0] + numeros[1];
console.log("Suma: " + suma );

var resta = 0;
resta = numeros[0] - numeros[1];
console.log("Resta: " + resta );

var mul = 0;
mul = numeros[0] * numeros[1];
console.log("Multiplicar: " + mul );

var divi = 0;
divi = numeros[0] / numeros[1];
console.log("Division: " + divi );

var modulo = 0;
modulo = numeros[0] % numeros[1];
console.log("Modulo: " + modulo );
