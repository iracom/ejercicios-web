$(document).ready(function(){
	//Ocultar los modulos
	var $divs = $("div.module").hide();
	
	//Añadir lista desordenada como menu
	var $lista = $("<ul/>")
					.attr('id','menu')
					.addClass('tabs');
	$divs.each(function(index){
		$h2 = $(this).find("h2").text();
		$li = $("<li/>")
				.text($h2)
				.data('target',this);
		$lista.append($li);
	});
	
	$lista.insertBefore($divs.first());
	
	//Añadir eventos paa mostrar los divs ocultos
	$lista.on('click','li',function(e){
		var $this = $(this);
		
		$this.addClass('current');
		$this.siblings().removeClass('current');
		
		//Mostrar el div asociado
		var div = $(this).data('target');
		$(div).show().siblings('.module').hide();
	});
	
	$lista.children().first().addClass('current');
	$divs.first().show();

});
