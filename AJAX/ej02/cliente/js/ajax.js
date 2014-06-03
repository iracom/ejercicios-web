var AJAX = (function(){
	
	var req = null;
	
	var READY_STATE_UNINITIALIZATED=0;
	var READY_STATE_LOADING=1;
	var READY_STATE_LOADED=2;
	var READY_STATE_INTERACTIVE=3;
	var READY_STATE_COMPLETE=4;
	
	var AJAX = function() {
		this.url = null;
		this.data = null;
		this.onsuccess = null;
		this.onerror = null;
		
		if(req === null) {
			req = inicializar_xhr();
		}
	}
	
	var inicializar_xhr = function(){
		return (window.ActiveXObject)? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
	}

	var cargarContenido = function() {
		var that = this;
		if(req){
			req.onreadystatechange = function() {
				muestraContenido.call(that);
			};
			req.open(this.method,this.url,true);
			req.send(this.data);
		} else {
			this.onerror("Se ha producido un error al realizar la peticion");
		}
	}
	
	var muestraContenido = function(){
		if(req.readyState === READY_STATE_COMPLETE){
			if(req.status === 200){
				var fecha = new Date();
				var noticia = req.responseText + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
				this.onsuccess(noticia);
			} else{
				console.log("error");
				this.onerror("Error al recibir la respuesta");
			}
		}
	}
	
	var get = function(options) {
		this.url = (options && options.url) || "http://localhost/";
		this.data = (options && options.data) || null;
		this.onsuccess = ((options && options.success))? options.success : this.onSuccessDefault;
		this.onerror = ((options && options.error))? options.error : this.onErrorDefault;
		this.method = 'GET';
		
		cargarContenido.call(this);
	}
	AJAX.prototype.get = get;
	
	return AJAX;
})();
