window.onload = function(){
	
	var footerBtn = $$('footer>nav>a');
	var headerBtn = $$('header>nav>button');
	var $fPrincipal = $$("#principal");
	var $fMapa = $$('#mapa');
	var $fBusqueda = $$('#fbusqueda');
	var $terremotos = $$('#terremotos');
	var $liBusqueda = $$('#libusqueda');
	var $mainArticle = $$('#main-article');
	var $automatico = $$('#automatico');
	var $tiempoAct = $$('#tiempoactualizacion');
	var $magnitud = $$('#magnitud')
	var $articulo = $$('articulo');
	var $btnDefaults = $$('#btnDefaults');
	
	var patronBusqueda = '';
	var automatico;
	
	/*
	 * Inicializar en el local store los valores por defecto del settings
	 */
	var settings = iniSettings.getSettings();
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
	///////////////////////////////////////////////////////////////
	
	/*
	 * Si hay que actualizar automaticamente
	 */
	if(settings.autoRefresh == 'on'){
		automatico = setInterval(actualizarDB,settings.time*60*1000);
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
	}();
	///////////////////////////////////////////////////////////////
	
	var botonFooter = function(e){
		e.preventDefault();
		var $this = $$(this);
		if($this.data('icon')==='menu'){
			//OcultarSearch
			$liBusqueda.addClass('hidden');
			
			//Activar-Desactivar
			footerBtn.removeClass('active');
			$fPrincipal.addClass('active');
		}
		else if ($this.data('icon')==='globe'){
			//Activar-Desactivar
			footerBtn.removeClass('active');
			$fMapa.addClass('active');
			
			//Mostrar mapa con puntos
			if(Modernizr.geolocation){
				adapter.getTerremotosMapa(20,settings.mag);
			}
		}
		else if($this.data('icon')==='search'){
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
		if($this.data('icon')==='share'){
			console.log("Boton compartir");
		}else if($this.data('icon') == 'menu'){
			if(settings.autoRefresh == 'off'){
				$automatico.removeAttr('checked');
				$tiempoAct.attr('disabled','disabled');
			}
			else{
				$automatico.attr('checked','checked');
				$tiempoAct.removeAttr('disabled');
			}
			$tiempoAct.val(settings.time);
			$magnitud.val(settings.mag);
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
		adapter.getTerremotoDBByPattern(patronBusqueda,settings.mag);
	}

	var actDesactTime = function(){
		var $this = $$(this);
		var chkEstado = settings.autoRefresh;
		if(chkEstado == 'on'){
			$this.removeAttr('checked');
			$tiempoAct.attr('disabled','disabled');
			settings.autoRefresh = 'off';
			clearInterval(automatico);
		}
		else{
			$tiempoAct.removeAttr('disabled');
			$this.attr('checked','checked');
			settings.autoRefresh = 'on';
		}
		iniSettings.setSettings(settings);
	}
	
	var guardarTiempo = function(e){
		var $this = $$(this);
		settings.time = $this.val();
		iniSettings.setSettings(settings);
		automatico = setInterval(actualizarDB,localStorage.getItem('time')*60*1000);
	}
	
	var guardarMagnitud = function(e){
		var $this = $$(this);
		settings.mag = $this.val();
		iniSettings.setSettings(settings);
	}
	
	var restablecerSettings = function(e){
		settings = iniSettings.getDefaults();
		iniSettings.setSettings(settings);
		$automatico.removeAttr('checked');
		$tiempoAct.attr('disabled','disabled');
		$magnitud.val(0);
	}
	
	footerBtn.on('tap',botonFooter);
	headerBtn.on('tap',botonHeader);
	$$('#libusqueda>fieldset>input').on('keyup',filtrarLista);
	$automatico.on('change',actDesactTime);
	$tiempoAct.on('change',guardarTiempo)
	$magnitud.on('change',guardarMagnitud);
	$btnDefaults.on('tap',restablecerSettings);
}
