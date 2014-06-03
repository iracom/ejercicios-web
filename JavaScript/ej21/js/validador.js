var Validador = function(){
	
}

Validador.prototype.obligatorio = function(valor){
	if(valor.value.length > 0){
		return true;
	}
	return false;
}

Validador.prototype.emailValido = function(valor){
	if(valor.value.length > 0){
		if(!(/^(\w|\.|\-)+@(\w)+\.[a-zA-Z]{2,3}$/.test(valor.value))){
			return false;
		}
	}
	return true;
}

Validador.prototype.maxCarac = function(valor){
	if(valor.value.length > 50){
		return false;
	}
	return true;
}

Validador.prototype.passValido = function(valor){
	if((/[a-z]+/.test(valor.value) && /[A-Z]+/.test(valor.value) && /[0-9]+/.test(valor.value)) && valor.value.length>5){
		return true;
	}
	return false;
}
