var mostrarNoticiasPeriodicas = function(){
	window.$ = function(selector){
		return document.querySelectorAll(selector);
	}
	
	var ticker = $("#ticker")[0];
	var detener = $("#detener")[0];
	var anterior = $("#anterior")[0];
	var siguiente = $("#siguiente")[0];
	
	var noticias = [];
	var indActual = 0;
	
	var ajax = new AJAX();
	
	var success = function(response){
		noticias.push(response);
		if (noticias.length>0){
			ticker.innerText = noticias[noticias.length-1];
		}
		if(noticias.length == 1){
			indActual = 0;
		}
		else{
			indActual++;
		}
		//ticker.innerText = response;
	}
	
	var error = function(error){
		console.log(error);
	}
	
	var interval = setInterval(function() {
		//ticker.style.background = "#F4F958";
		ajax.get({
			url : "../servidor/generaContenidos.php",
			success : success,
			error : error
		});
	}, 1000);
	
	var iniciarIntervalo = function(detener){
		detener.value = "Detener";
		indActual = noticias.length-1;
		//ticker.style.background = "#F4F958";
		interval = setInterval(function() {
		ajax.get({
			url : "../servidor/generaContenidos.php",
			success : success,
			error : error
		});}, 1000);
	}
	
	var detenerIntervalo = function(detener){
		detener.value = "Iniciar";
		clearInterval(interval);
	}
	
	var ejecutarAccion = function(e){
		if(this.value == "Detener"){
			detenerIntervalo(this);
		}
		else
		{
			iniciarIntervalo(this);
		}
	}
	detener.addEventListener("click",ejecutarAccion);
	
	var mostrarAnterior = function(){
		detenerIntervalo(detener);
		if(indActual>0){
			indActual--;
		}
		else{//indActual==0 Ha llegado al primero
			indActual = noticias.length-1;
		}
		ticker.innerText = noticias[indActual];
	}
	anterior.addEventListener("click",mostrarAnterior);
	
	var mostrarSiguiente = function(){
		detenerIntervalo(detener);
		if(indActual<noticias.length-1){
			indActual++;
		}
		else{//indActual==noticias.length-1 Ha llegado al último
			indActual = 0;
		}
		ticker.innerText = noticias[indActual];
	}
	siguiente.addEventListener("click",mostrarSiguiente);
}

window.onload = mostrarNoticiasPeriodicas;
