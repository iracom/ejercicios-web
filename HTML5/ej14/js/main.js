$(document).ready(function(){
	var $numero = $("input[type=number]");
	var $primos = $("#primos");
	var $tiempo = $("#tiempo");
	
	var calcularPrimos = function(e){
		e.preventDefault();
		
		if($numero.val().length != 0){
			var worker = new Worker('js/calcularPrimos.js');
			worker.postMessage(JSON.stringify($numero.val()));
			worker.addEventListener('message',function(e){
				console.log(e.data);
				var primos = '';
				for(primo in e.data){
					primos = primos + " " + primo;
				}
				$primos.val(primos);
			});
			worker.addEventListener('error',function(e){
				console.log('ERROR: Line ' + e.lineno + ' in ' + e.filename + ': ' + e.message);
			});
		}
	}
	
	$(":input[type=submit]").on("click",calcularPrimos);
});
