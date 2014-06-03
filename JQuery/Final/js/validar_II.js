(function($){
	
	var createErrMsg = function(msg, elemento){
		var $div = $('<div/>');
		$div.addClass("errorMsg")
			.text(msg)
			.css({
				'color': 'red',
				'marginLeft': '200px'
			});
		$div.insertAfter(elemento);
		elemento.addClass('fielderror');
	};
	
	var deleteErrMsg = function(elemento){
		elemento.removeClass('fielderror');
	}
	
	var ejecutarAjax = function(elemento){
		var $this = elemento;
		if ($this.find(".fielderror").length === 0){
			alert("Ajax ejecutado");
			$.ajax({
				url: $this.attr('action'),
				data: {formulario : $that},
				type: $that.attr('method'),
				dataType: json,
				success: function(json){
					alert: "Formulario correcto";
				},
				error: function(jqXHR, status, error){
					alert("Ha ocurrido un error");
				},
				complete: function(jqXHR, status){
					alert("Petición realizada");
				}
			});	
		}
	}
	
	var validarFormulario = function(e) {
		var $this = $(this),
			errores = [];
		
		$this.find(':input').not(':checkbox').each(function(){
			if(!validarCampo.call(this)){ //Con el this se pasan por porametro cada el DOM de cada input que no es checkbox
				var data = {
					error = e.data.opts.error;
				}
				errores.push(this, {data: data});
			};
		});
		
		if(errores.length>0){
			e.preventDefaulr();
		}
		else{
			// Llamada AJAX
		}
	}
	
	var validarCampo = function(e) {
		var $campo = $(this);
		
		if($campo.hasClass('required')){
			if(!validaciones.required($campo.val())){
				mostrarError(e.data.error.requerido,$campo);
				return false;
			}
		}
		
		//..Aquí irían el resto de validaciones
		
		return true;
	}
	
	var mostrarError = function(msg, $campo){
		var $target = $.data($campo[0],'target'); //Con $campo[0] obtenemos el DOM de $campo, que es un elemento JQuery
		
		if(!$target || $target.length === 0){ //Comprobar si está el div creado. Si no lo está se crea y guardamos su referencia con el $.data
			$target = $('<div/>')			  // Cuando se quiera quitar el div, será major ocultarlo que quitarlo, por el coste que conlleva volverlo a crear
						.addClass('fielderror')
						.after($campo);
			$data($campo[0], 'target', $target);
		}
		
		$target.text(msg);
	}
		
	$.fn.validar = function(options){
		
		var opts = $.extend({}, $.fn.validar.defaults, options);
	
		return this.filter('form').each(function(){
			var $this = $(this);
			
			$this.on('submit', {opts: opts}, validarFormulario)
				 .find(':input').not(':checkbox').on('blur keyup',{opts: opts},validarCampo).end()
				 .find(':checkbox').on('click',{opts: opts},validarCampo);
		});
	}
	
	$.fn.validar.defaults = {
	    errorMsgs : {
			requerido: "Este campo es necesario",
			number: "Este campo debe contener números",
			email: "El email introducido no tiene el formato correcto",
			password: "El password introducido no tiene el formato correcto",
			url: "La Url introducido no tiene el formato correcto"
		}
	  };
})(jQuery);
