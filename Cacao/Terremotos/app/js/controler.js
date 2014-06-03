/*
 * var Controler = (function(){
 * 	
 * 		var showDetail = function(e){
 * 	
 * 		}
 * 
 * 		return {
 * 			showDetail: showDetail
 * 		}
 * })();
 */


window.onload = function(){
	
	var footerBtn = $$('footer>nav>a');
	var headerBtn = $$('header>nav>button');
	var $fPrincipal = $$("#principal");
	var $fMapa = $$('#mapa');
	var $fBusqueda = $$('#fbusqueda');
	var $terremotos = $$('#terremotos');
	var $liBusqueda = $$('#libusqueda');
	var $mainArticle = $$('#main-article');
	var $worldMap = $$('#world-map');
	var $automatico = $$('#automatico');
	var $tiempoAct = $$('#tiempoactualizacion');
	var $magnitud = $$('#magnitud')
	var $articulo = $$('articulo');
	
	var patronBusqueda = '';
	var automatico;
	
	/*
	 * Inicializar en el local store los valores por defecto del settings
	 */
	// var autoRefresh = localStorage.getItem('autoRefresh') || 'off';
	// var time = localStorage.getItem('time') || '0';
	// var mag = localStorage.getItem('mag') || '0';
	// localStorage.setItem('autoRefresh',autoRefresh);
	// localStorage.setItem('time',time);
	// localStorage.setItem('mag',mag);
	///////////////////////////////////////////////////////////////
	
	/*
	  Crear la base de datos o actualizar si es que ya estaba creada  
	  */
	var adapter = new Adapter();
	var actualizarDB = function(){
		adapter.obtenerDatosJSON();
		adapter.crearDB();
	}
	actualizarDB();
	adapter.getTerremotots();
	///////////////////////////////////////////////////////////////
	/*
	 * Si hay que actualizar automaticamente
	 */
	if(autoRefresh == 'on'){
		automatico = setInterval(actualizarDB,localStorage.getItem('time')*60*1000);
	}
	///////////////////////////////////////////////////////////////
	
	/*
	 * Inicializar las pantallas
	 */
	var inicializarPantalla = function(){
		footerBtn.removeClass('active');
		$mainArticle.addClass('active');
		if($liBusqueda.hasClass('hidden')){
			$fPrincipal.data('view-article','main-article');
			$fPrincipal.addClass('active');
			$fBusqueda.removeAttr('data-view-article');
		}
		else{
			$fBusqueda.data('view-article','main-article');
			$fBusqueda.addClass('active');
			$fPrincipal.removeAttr('data-view-article');
		}
		$fMapa.data('view-article','world-map');
		
	}
	
	inicializarPantalla();
	///////////////////////////////////////////////////////////////
	
	/*
	 * Funciones para los eventos
	 */
	var botonFooter = function(e){
		e.preventDefault();
		var $this = $$(this);
		if($this.data('icon')==='menu'){
			//Mostrar pantalla inicial
			$mainArticle.addClass('active');
			$worldMap.removeClass('active');
			//OcultarSearch
			$liBusqueda.addClass('hidden');
			
			//Activar-Desactivar
			footerBtn.removeClass('active');
			$fPrincipal.addClass('active');
		}
		else if ($this.data('icon')==='globe'){
			//Mostrar pantalla mapa
			$mainArticle.removeClass('active');
			$worldMap.addClass('active');
			//Activar-Desactivar
			footerBtn.removeClass('active');
			$fMapa.addClass('active');
			
			//Mostrar mapa con puntos
			if(Modernizr.geolocation){
				adapter.getTerremotosMapa();
			}
		}
		else if($this.data('icon')==='search'){
			//Mostrar pantalla inicial
			$mainArticle.addClass('active');
			$worldMap.removeClass('active');
			//reiniciar patrón de busqueda
			patronBusqueda = '';
			//Mostrar el Search
			$liBusqueda.removeClass('hidden');
			
			//Activar-Desactivar
			footerBtn.removeClass('active');
			$fBusqueda.addClass('active');
		}
	}
	
	
	var botonHeader = function(e){
		e.preventDefault();
		var $this = $$(this);
		if($this.data('icon')==='chevron-left'){
			var header = ($this.parent()).parent();
			var articulo = header.siblings('article')[0];
			if($$(articulo).attr('id') == 'settings'){
				
			}
		} else if($this.data('icon')==='share'){
			console.log("Boton compartir");
		} else if($this.data('icon') == 'menu'){
			if(localStorage.getItem('autoRefresh') == 'off'){
				$automatico.removeAttr('checked');
				$tiempoAct.attr('disabled','disabled');
			}
			else{
				$automatico.attr('checked','checked');
				$tiempoAct.removeAttr('disabled');
			}
			$tiempoAct.val(localStorage.getItem('time'));
			$magnitud.val(localStorage.getItem('mag'));
		}
	}
	
	var filtrarLista = function(e){
		e.preventDefault();
		var $this = $$(this);
		if(e.keyCode==8){ //Borrado
			patronBusqueda = patronBusqueda.substring(0,patronBusqueda.length-1);
		}
		else if(e.keyCode!=13){//Enter
			patronBusqueda = $this.val();
		}
		adapter.getTerremotoDBByPattern(patronBusqueda);
	}
	
	var actDesactTime = function(e){
		var $this = $$(this);
		var chkEstado = localStorage.getItem('autoRefresh');
		if(chkEstado == 'on'){
			$this.removeAttr('checked');
			$tiempoAct.attr('disabled','disabled');
			localStorage.setItem('autoRefresh','off');
			clearInterval(automatico);
		}
		else{
			$tiempoAct.removeAttr('disabled');
			$this.attr('checked','checked');
			localStorage.setItem('autoRefresh','on');
		}
		
	}
	
	var guardarTiempo = function(e){
		var $this = $$(this);
		localStorage.setItem('time',$this.val());
		automatico = setInterval(actualizarDB,localStorage.getItem('time')*60*1000);
	}
	
	var guardarMagnitud = function(e){
		var $this = $$(this);
		localStorage.setItem('mag',$this.val());
	}
	
	footerBtn.on('tap',botonFooter);
	headerBtn.on('tap',botonHeader);
	$$('#libusqueda>fieldset>input').on('keyup',filtrarLista);
	$automatico.on('change',actDesactTime);
	$tiempoAct.on('change',guardarTiempo)
	$magnitud.on('change',guardarMagnitud);
}
