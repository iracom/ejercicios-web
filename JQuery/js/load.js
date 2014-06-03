$(document).ready(function(){
	
	var $h3 = $("#blog h3");
	var $divs = $('<div/>').insertAfter($h3);
	
	$divs.each(function(index){
		$(this).siblings('h3').data('target',this);
	});
	
	$h3.each(function(index){
		var $that = $(this);
		$that.children("a").on('click',function(e){
			e.preventDefault();
			var $this = $(this);
			var href = $this.attr('href');
			var tempArray = href.split('#');
			var id = tempArray[1];
			var div = $that.data('target');
			$(div).load('data/blog.html #'+id);
			//$(div).load('http://www.arkaitzgarro.com/jquery/data/blog.html #'+id);
		});
		
		//Para poder acceder a otro dominio, utilizar jsonp. Pero para que funcione, el servidor tiene que estar preparado para devolver
		//mediante el callback solicitado.
		// $that.children('a').on('click',function(e){
			// e.preventDefault();
			// var href = $(this).attr('href');
			// var tempArray = href.split('#');
			// var $id = tempArray[1];
			// $.ajax({
				// url: 'http://www.arkaitzgarro.com/jquery/data/blog.html',
				// jsonp: 'callback',
				// dataType: 'jsonp',
				// data: {
					// id: $id
				// },
				// success: function(response){
					// //$that.data('target').html(response);
					// console.log(response);
				// }
			// });
		// });
	});
	
	//Hecho por Arkaitz
	// var $h3 = $("#blog h3");
	// $('#blog .excerpt').remove();
// 	
	// $h3.each(function(i, el){
		// var $this = $(this);
// 		
		// $target = $('<div/>'.insertAfter($this));
		// $this.data('target',$target);
	// });
// 	
	// $h3.on('click', function(e){
		// e.preventDefault();
		// var $this = $(this),
			// $a = $this.find('a'),
			// href = $a.attr('href'),
			// id = '#' + href.split('#')[1];
// 			
		// $.get('data/blog.html', function(html){
			// var $html = $(html);
// 			
			// $this.data('target').html($html.filter(id).html());
		// });
	// });
	
});
