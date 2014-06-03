var comprobarNombre = function(){
	window.$ = function(selector){
		return document.querySelectorAll(selector);
	}
	
	var comprobar = $("#comprobar")[0];
	var login = $("#login")[0];
	var ajax = new AJAX();
	
	var correcto = function(response){
		alert("El usuario existe? " + response);
	}
	
	var comprobarN = function(){
		if(login.value.length === 0 || login.value.trim().length == 0){
			alert("No hay nada escrito");
		}
		else{
			ajax.post({
				url: "../servidor/compruebaDisponibilidad.php",
				data: {usuario: login.value,
						nocache: Math.random
						},
				success: correcto
			});
		}
		
	}
	
	comprobar.addEventListener("click",comprobarN,false);
}

window.onload = comprobarNombre;