var cargarPagina = function(){
	var municipio = document.querySelectorAll("#municipio")[0];
	var sugerencias = document.querySelectorAll("#sugerencias")[0];
	
	var ajax = new AJAX();
	
	Array.prototype.transformar = function(){
		var ul = document.createElement("ul");
		// for(i in this){
			// var li = document.createElement("li");
			// var contenido = document.createTextNode(this[i]);
			// li.appendChild(contenido);
			// ul.appendChild(li);
		// }
		for(var i=0;i<this.length-1;i++){
			var li = document.createElement("li");
			var contenido = document.createTextNode(this[i]);
			li.appendChild(contenido);
			ul.appendChild(li);
		}
		return ul;
	}
	
	var mostrarSugerencias = function(response){
		if(sugerencias.childElementCount>0){
			sugerencias.removeChild(sugerencias.firstElementChild);
		}
		var respuesta = JSON.parse(response);
		sugerencias.appendChild(respuesta.transformar());
	}
	
	var enfocarArriba = function(){
		var isEnfocado = false;
		var lista = sugerencias.lastElementChild.children;
		var ind = lista.length-1;
		while(-1<ind && !isEnfocado){
			isEnfocado = (lista[ind].className == "enfocado");
			ind--;
		}
		if(!isEnfocado){
			sugerencias.firstElementChild.lastElementChild.className = "enfocado";
		}
		else{
			var nodo = lista[ind+1];
			if(!(nodo.previousElementSibling == null)){
				nodo.className = "noenfocado";
				nodo.previousElementSibling.className = "enfocado";
			}
		}
	}
	
	var enfocarAbajo = function(){
		var isEnfocado = false;
		var ind = 0;
		var lista = sugerencias.firstElementChild.children;
		while(ind<lista.length && !isEnfocado){
			isEnfocado = (lista[ind].className == "enfocado");
			ind++;
		}
		if(!isEnfocado){
			sugerencias.firstElementChild.firstElementChild.className = "enfocado";
		}
		else{
			var nodo = lista[ind-1];
			if(!(nodo.nextElementSibling == null)){
				nodo.className = "noenfocado";
				nodo.nextElementSibling.className = "enfocado";
			}
		}
	}
	
	var seleccionarMunicipio = function(){
		var isEnfocado = false;
		var ind = 0;
		var lista = sugerencias.firstElementChild.children;
		while(ind<lista.length && !isEnfocado){
			isEnfocado = (lista[ind].className == "enfocado");
			ind++;
		}
		if(isEnfocado){
			municipio.value = lista[ind-1].innerText;
		}
	}
	
	var autocompleta = function(e){
		if(e.keyCode == 13){//Enter
			seleccionarMunicipio();
		}
		else if (e.keyCode == 38){//Flecha arriba
			enfocarArriba();
		}
		else if (e.keyCode == 40){//Flecha abajo
			enfocarAbajo();
		}
		else{
			ajax.post({
				url: "../servidor/autocompletaMunicipios.php",
				success: mostrarSugerencias,
				data: {municipio: municipio.value}
			});
		}
	}
	
	municipio.addEventListener("keyup",autocompleta);
}

window.onload = cargarPagina;
