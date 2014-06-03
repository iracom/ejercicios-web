(function($){
	$.fn.stripe = function(color){
		var c = color || "#F1F1F1";
		return this.each(function(){ 
			$(this).find('tbody tr:even').css('backgroundColor',c); //No hace falta hacer each, o sea, para cada uno, ya que css lo hará
		});
	};
})(jQuery);