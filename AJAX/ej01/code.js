var cargarPagina = function(){
	window.$ = function(selector){
		return document.querySelectorAll(selector);
	}

	var READY_STATE_UNINITIALIZED=0; 
	var READY_STATE_LOADING=1; 
	var READY_STATE_LOADED=2;
	var READY_STATE_INTERACTIVE=3; 
	var READY_STATE_COMPLETE=4;

	var recurso = $("#recurso")[0];
	var boton = $("#enviar")[0];
	var contenidos = $("#contenidos")[0];
	var estados = $("#estados")[0];
	var cabeceras = $("#cabeceras")[0];
	var codigo = $("#codigo")[0];

	var peticion_http;

	function inicializar_xhr(){
		if(window.XMLHttpRequest){
			return new XMLHttpRequest();
		}
		else if(window.ActiveXObject){
			return new ActiveXObject("Microsoft.XMLHTTP");
		}
	}

	var cargaContenido = function(url,metodo,funcion){
		peticion_http = inicializar_xhr();
	
		if(peticion_http){
			peticion_http.onreadystatechange = funcion;
			peticion_http.open(metodo,url,true); //Metodo open, se prepara el envio
			peticion_http.send(null); //Metodo send, se envía lo preparado. Como parametros habría que poner más información en caso de que se necesitara.
		}
	}

	function muestraContenido(){
		switch(peticion_http.readyState){
			case 0: estados.innerText += "NO INICIALIZADA\n";
				break;
			case 1: estados.innerText += "CARGANDO\n";
				break;
			case 2: estados.innerText += "CARGADA\n";
				break;
			case 3: estados.innerText += "INTERACTIVA\n";
				break;
			case 4: estados.innerText += "COMPLETADA\n";
				break;
		} 
		if(peticion_http.readyState == READY_STATE_COMPLETE){
			if(peticion_http.status == 200){
				contenidos.innerText = peticion_http.responseText;
			}
			codigo.innerText = peticion_http.status + "\n" + peticion_http.statusText;
			cabeceras.innerText = peticion_http.getAllResponseHeaders();
		}
	}

	var vaciarCampos = function(){
		contenidos.innerText = "";
		estados.innerText = "";
		codigo.innerText = "";
		cabeceras.innerText = "";
	}

	var mostrarInformacion = function(){
		vaciarCampos();
		cargaContenido(recurso.value,"GET",muestraContenido);
	}

	recurso.value = document.URL;
	boton.addEventListener("click",mostrarInformacion);
}

window.onload = cargarPagina;