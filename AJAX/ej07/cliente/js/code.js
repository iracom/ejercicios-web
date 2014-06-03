var cargarPagina = function(){
	
	var provincias = document.getElementById("provincias");
	var municipios = document.getElementById("municipios");
	
	var ajax = new AJAX();
	
	var getProvincias = function(response){
		var respuesta = JSON.parse(response);
		for(p in respuesta){
			if(!(respuesta[p] == null)){
				var provincia = new Option(respuesta[p],p);
				provincias[provincias.length] = provincia;
			}
		}
	}
	
	ajax.post({
		url: "../servidor/cargaProvinciasJSON.php",
		success: getProvincias
	});
	
	var getMunicipios = function(response){
		var respuesta = JSON.parse(response);
		for(p in respuesta){
			if(!(respuesta[p] == null)){
				var municipio = new Option(respuesta[p],p);
				municipios[municipios.options.length] = municipio;
			}
		}
	}
	
	var vaciarMunicipios = function(){
		municipios.innerHTML = '';
		
		// for(var i=0;i<municipios.options.length;i++){
			// municipios.removeChild(municipios.childNodes[i]);
		// }
	}
	
	var obtenerMunicipios = function(){
		vaciarMunicipios();
		ajax.post({
			url: "../servidor/cargaMunicipiosJSON.php",
			success: getMunicipios,
			data: {provincia: provincias.value}
		});
	}
	
	provincias.addEventListener("change",obtenerMunicipios,false);
}

window.onload = cargarPagina;