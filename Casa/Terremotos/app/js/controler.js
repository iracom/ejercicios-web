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
	//var $arrow = $$('.arrow');
	
	var patronBusqueda = '';
	var automatico;
	
	var adapter = new Adapter();
	var actualizarDB = function(){
		adapter.obtenerDatosJSON();
		adapter.crearDB(settings.mag);
	}
	actualizarDB();
	
	var autoRefresh = 'off';
	var time = '0';
	var mag = '0';
	localStorage.setItem('autoRefresh',autoRefresh);
	localStorage.setItem('time',time);
	localStorage.setItem('mag',mag);
	
	$mainArticle.addClass('active');
	footerBtn.removeClass('active');
	$fPrincipal.addClass('active');
	$fPrincipal.data('view-article','main-article');
	$fMapa.data('view-article','world-map');
	$fBusqueda.data('view-article','main-article');
	
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
				adapter.getTerremotosMapa();
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
	
	var miAutomatico = function(){
		console.log(new Date());
	}
	
	var botonHeader = function(e){
		e.preventDefault();
		var $this = $$(this);
		if($this.data('icon')==='chevron-left'){
			var header = ($this.parent()).parent();
			var articulo = header.siblings('article')[0];
			if($$(articulo).attr('id') == 'settings'){
				if(localStorage.getItem('autoRefresh') == 'on'){
					localStorage.setItem('time',$tiempoAct.val());
					automatico = setInterval(actualizarDB,localStorage.getItem('time')*60*1000);
				}
				localStorage.setItem('mag',$magnitud.val());
			}
		} else if($this.data('icon')==='share'){
			console.log("Boton compartir");
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
	
	// var guardarIdTerremoto = function(e){
		// e.preventDefault();
		// var $this = $$(this);
		// var objId = {'id':$this.attr('id')};
		// Lungo.Cache.set("idTerremoto",objId);
		// //console.log((Lungo.Cache.get("idTerremoto")).id);
	// }
	
	var actDesactTime = function(){
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
	
	var actAutomatica = function(){
		var $this = $$(this);
		
	}
	
	footerBtn.on('tap',botonFooter);
	headerBtn.on('tap',botonHeader);
	$$('#libusqueda>fieldset>input').on('keyup',filtrarLista);
	$automatico.on('change',actDesactTime);
	//$arrow.on('tap',guardarIdTerremoto);
}
