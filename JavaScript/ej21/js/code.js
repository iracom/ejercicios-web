window.onload = function(){
	var validar = new Validador();
	
	var nombre = document.getElementById("registro_nombre");
	var email = document.getElementById("registro_email");
	var comentarios = document.getElementById("registro_comentarios");
	var password = document.getElementById("registro_password");
	var form = document.getElementById("registro");

	var validarCampo = function(){
		var validado = validar.obligatorio(this);
		var mensage = "Tiene que introducir texto en el campo ";
		if(!validado){
			if(this.id === "registro_nombre"){
				alert(mensage + "del nombre.");
			}
			if(this.id === "registro_email"){
				alert(mensage + "del email.");
			}
			if(this.id === "registro_comentarios"){
				alert(mensage + "los comentarios");
			}
		}
	}

	var validarEmail = function(){
		var validado = validar.emailValido(this);
		if(!validado){
			alert("El email no tiene un formato correcto.")
		}
	}

	var maximoCaracteres = function(){
		var validado = validar.maxCarac(this);
		if(!validado){
			alert("La cantidad máxima de caracteres permitidos es 50.")
		}
	}

	var passCorrecto = function(){
		var validado = validar.passValido(this);
		if(!validado){
			alert("El formato del password no es correcto.");
		}
	}

	var validacion = function(e){
		if(!validar.obligatorio(nombre) || !validar.obligatorio(email) || !validar.obligatorio(comentarios) || !validar.emailValido(email) || 
		!validar.maxCarac(comentarios) || !validar.passValido(password)){
			alert("Los campos del formulario marcados no se han llenado correctamente");
			e.preventDefault();
			if(!validar.obligatorio(nombre)){
				nombre.className = "error";
			}
			else{
				nombre.className = "bien";
			}
			if(!validar.obligatorio(email) || !validar.emailValido(email)){
				email.className = "error";
			}
			else{
				email.className = "bien";
			}
			if(!validar.obligatorio(comentarios) || !validar.maxCarac(comentarios)){
				comentarios.className = "error";
			}
			else{
				comentarios.className = "bien";
			}
			if(!validar.passValido(password)){
				password.className = "error";
			}
			else{
				password.className = "bien";
			}
			return false;
		}
		return true;
	}

	nombre.addEventListener("blur",validarCampo,false);
	email.addEventListener("blur",validarCampo,false);
	comentarios.addEventListener("blur",validarCampo);

	email.addEventListener("blur",validarEmail,false);

	comentarios.addEventListener("blur",maximoCaracteres,false);

	password.addEventListener("blur",passCorrecto,false);

	form.addEventListener("submit",validacion,false);

}
