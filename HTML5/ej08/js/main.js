$(document).ready(function(){
	var $input = $("form :input");
	
	var usuario = new Object();
	
	if(localStorage.getItem('usuario'))
	{
		usuario = JSON.parse(localStorage.getItem('usuario'));
		for(var campo in usuario){
			console.log(campo + ": " + usuario[campo]);
			// if($input.attr('name')===campo){
				// $input.val(usuario[campo]);
			// }
			$("form :intput[name="+campo+"]")
		}
		// if(usuario.nombre.length > 0){
			// $nombre.val(usuario.nombre);
		// };
		// if(usuario.apellido.length > 0){
			// $apellido.val(usuario.apellido);
		// };
	} else {
		usuario = {
			nombre: '',
			apellido: '',
			email: '',
			password: ''
		}
	}
	
	var handleStorage = function(event){
		event = event || window.event;
		if(event.newValue === null){
			
		} else {
			
		}
	}
	
	var guardarDato = function(){
		var $this = $(this);
		usuario[$this.attr('name')] = $this.val();
		localStorage.setItem('usuario',JSON.stringify(usuario));
	}
	
	$input.on('blur',guardarDato);
	window.addEventListener('storage',handleStorage, false);
})
