$(document).ready(function(){
	
	var opts = {
		errorMsgs : {
			required: "--Este campo es necesario",
			number: "--Este campo debe contener números",
			email: "--El email introducido no tiene el formato correcto",
			password: "--El password introducido no tiene el formato correcto",
			url: "--La Url introducido no tiene el formato correcto"
		}
	};
	
	$("form").validar(opts);
	
});
