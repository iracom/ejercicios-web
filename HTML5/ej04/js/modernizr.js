// $(document).ready(function(){
	// Modernizr.load({
		// test: Modernizr.inputtypes.datetime,
		// nope: "js/code.js"
	 // });
// });

//Otro modo. Así, no tenemos que tener otro fichero js que haga la funcion y las librerías se cargarían aquí en vez de al principio.
//Es decir: las librerías se cargarían en caso de que no funcionasen los elementos de HTML5
$(document).ready(function(){
	Modernizr.load({
		test: Modernizr.inputtypes.datetime,
		nope: ["http://code.jquery.com/ui/1.10.4/jquery-ui.js","http://code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css"],
		callback: function(url, result, key){
			if(key===1){ //this.nope.length-1
				$("input[type='datetime']").datepicker();
			}
		}
	});
})