var comprobarDNI = function(dni){
	if(dni.length===9){
		var numero = dni.substring(0,8);
		var letra = dni.charAt(dni.length-1);
	
		if(numero<0 || numero>99999999) {
			console.log("El número del DNI " + dni + " no es válido.");
		}
		else{
			var numletra = numero % 23;
			var letras = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E', 'T'];
			var miletra = letras[numletra];
			if(miletra == letra.toUperCase()){
				console.log("El número y la letra del DNI " + dni + " son correctos.");
			}
			else {
				console.log("La letra del DNI " + dni + " no es correcta. El número indicado devuelve la letra: " + miletra);
			}
		}
	}
}

comprobarDNI("72483804V");
comprobarDNI("72483804L");
comprobarDNI("724838041V");
comprobarDNI("-72483804V");