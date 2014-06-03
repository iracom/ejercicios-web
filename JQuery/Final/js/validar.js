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
			options = e.data;
			errores = [];
		
		$this.find(':input').each(function(){
			var error = validarCampo.call(this,options);
			if(error.length>0){
				errores.push(error);
			}
		});
		
		//Envío de la información
		if(errores.length > 0) {
			e.preventDefault();
		} else {
			ejecutarAjax($this);
		}
	}
	
	var validarCampo = function(opts) {
		var $that = $(this);
		console.log(this);
		var	options = opts,
			error = "";

		//Limpiar errores
		$that.siblings('.errorMsg').remove();

		//Clases required
		if($that.hasClass('required')){
			if($that.attr('type') === 'checkbox'){
				deleteErrMsg($that.next());
				if(!$that.is(":checked")){
					var errorMsg = options.required || "Tiene que aceptar las condiciones del servicio";
					createErrMsg(errorMsg,$that.next());
					error = errorMsg;
				}
			}
			else{
				deleteErrMsg($that);
				if(!validar.obligatorio($that.val())){
					var errorMsg = options.required || "Este campo es necesario";
					createErrMsg(errorMsg,$that);
					error = errorMsg;
				};
			}
		};
		
		//Clases number
		if($that.hasClass("number")){
			deleteErrMsg($that);
			if(!validar.numero($that)){
				var errorMsg = options.number || "Este campo debe contener números";
				createErrMsg(errorMsg,$that);
				error = errorMsg;
			};
		};
		
		//Clases email
		if($that.hasClass("email")){
			deleteErrMsg($that);
			if(!validar.email($that.val())){
				var errorMsg = options.email || "El email introducido no tiene el formato correcto";
				createErrMsg(errorMsg,$that);
				error = errorMsg;
			}
		}
		
		//Clases password
		if($that.hasClass("password")){
			deleteErrMsg($that);
			if(!validar.password($that.val())){
				var errorMsg = options.password || "El password introducido no tiene el formato correcto";
				createErrMsg(errorMsg,$that);
				error = errorMsg;
			}
		}
		
		//Clase url
		if($that.hasClass("url")){
			deleteErrMsg($that);
			if(!validar.url($that.val())){
				var errorMsg = options.url || "La Url introducido no tiene el formato correcto";
				createErrMsg(errorMsg,$that);
				error = errorMsg;
			}
		}
		return error;
	}
		
	$.fn.validar = function(options){
		var opts = $.extend({}, $.fn.validar.defaults, options);
		
		return this.filter('form').each(function(){
			var $this = $(this);
			
			$this.on('submit', opts.errorMsgs, validarFormulario)
				 .find(':input').not(':checkbox').on('keypress', validarCampo); //Arkaitz: .find(':input').not(':checkbox').on('blur keyup',validarCampo).end()
			$this																//		   .find(':checkbox').on('click',validarCampo);
				 .find(':checkbox').on('click', validarCampo);
		});
	}
	
	$.fn.validar.defaults = {
	    errorMsgs : {
			required: "Este campo es necesario",
			number: "Este campo debe contener números",
			email: "El email introducido no tiene el formato correcto",
			password: "El password introducido no tiene el formato correcto",
			url: "La Url introducido no tiene el formato correcto"
		}
	  };
})(jQuery);
