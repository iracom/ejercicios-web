$('document').ready(function(){
	//SELECCIONES
	//Seleccionar todos los elementos "div" que poseen la clase "module"
	var $divs = $('div.module');
	// console.log($divs);
	// console.log($divs.length);
	
	//Especificar tres selectores que puedan seleccionar el tercer íten de la lista desordenada #myList
	var $tercero1 = $('#myList li').eq(2);
	//console.log($tercero);
	
	var $tercero2 = $('#myList li').first().next('li').next('li');
	//console.log($tercero2);
	
	var $tercero3 = $('#myListItem');
	//console.log($tercero3);
	
	var $tercero4 = $('#myList li:nth-child(2)');
	//console.log($tercero4);
	
	//Seleccionar el elemento "label" del elemento "input" utilizando un selector de atributo
	var $label = $("label[for='q']"); //ejemplo
	var $input = $("input#id"); // obtener el input deseado mediante id
	var $input2 = $("input[name='q']");
	var $label2 = $("label[for='"+$input2.attr('name')+"']"); // obtener el label que hace referencia al input obtenido en el paso anterior
	//console.log($label2);
	
	//Cuantos elementos están ocultos
	var $ocultos = $(':hidden').length;
	//console.log($ocultos);

	//Cuantas imagenes poseen el atributo alt
	var $imagenes = $('img[alt]').length;
	//console.log($imagenes);
	
	//Seleccionar las filas impares del cuerpo de la tabla
	var $impares = $('#fruits tbody tr:even'); //even obtiene los pares y como la primera fila tiene indice 0 obtendrá este.
	//console.log($impares);
	
	//RECORRER EL DOM
	//Seleccionar todas las imagenes y mostrar el elemento alt de cada una
	$("img").each(function(){
		//console.log($(this).attr('alt')); //Otra forma: console.log(this.alt);
	});
	
	//Seleccionar elemento input y añadir una clase al formulario padre
	var $input = $("input[name='q']"); //suponiendo que el input a buscar contiene el nombre q
	$input.closest("form").addClass('miClase');
	//$("form input:first-of-type").closest("form").addClass('foo'); //Esta es otra forma de conseguirlo. Y en este caso lo haría en los dos forms que hay
	
	//Seleccionar el item con clase "current" dentro de #myList y borrar la clase.
	//Luego añadir clase "current" al siguiente item.
	$("#myList li.current")
		.removeClass("current")
		.next()
		.addClass("current");
	
	//Seleccionar el elemento select dentro de #specials; luego dirigirse hacia el boton submit
	$("#specials select[name='day']")
		.closest("form")
		.find("input[type='submit']");
	
	//Tambien se puede utilizar este, pero es mas debil:
	// $("#specials select[name='day']")
		// .parent()
		// .next().children().eq(0);
		
	//Otra forma:
	// $("#specials select[name='day']")
		// .parent()
		// .next(".buttons").find('.input_submit');
	
	//Seleccionar el primer elemento de #slideshow; añadirle la clase "current" y "disabled" al resto
	$("#slideshow :first-child")
		.addClass("current")
		.siblings().addClass("disabled");
	
	//Esta forma la he hecho yo
	// $("#slideshow li").each(function(index){
		// if(index==0){
			// $(this).addClass("current");
		// }
		// else{
			// $(this).addClass("disabled");
		// }
	// });
	
	//MANIPULACION
	//Añadir 5 nuevos items al final de la lista #myList
	// var miLista = [];
	// for(var i=0;i<5;i++){
		// miLista.push("<li>Item" + i + "</i>");
	// }
	// $("#myList").append(miLista.join(''));
	
	//Remover los items impares de la lista
	//$("#myList li:even").remove();

	//Añadir otro elemento "h2" y otro parrafo al ultimo "div.module"
	// var elementos = ["<h2>Elemento1</h2>","<p>Elemento2</p>"];
	// $("#specials").append(elementos.join(''));
	
	// var $titulo = $("<h2>Titulo</h2>");
	// var $parrafo = $("<p>Lo que sea</p>");
	// $("div.module")
		// .last()
		// .append($titulo)
		// .append($parrafo);
// 		
	// $titulo.appendTo($("div.module:last"));
  	
	//Añadir otra opcion al elemento "select", dandole el valor "wednesday".
	//$("select[name='day']").append("<option value='wednesday'>Wednesday</option>");
	
	//Otra forma de obtenerlo, sería mediante javascript: $("select[name='day']")[0].ptions.add(new...)
   	
	// //Añadir un nuevo div.module a la página después del último; luego añadir una copia de una de las imágenes existentes dentro del nuevo div.
	var $img = $("#slideshow img:first");
	var $div = $("<div class=module></div>");
	$div.append($img.clone());
	$div.insertAfter($("div.module:last"));

 });
 
