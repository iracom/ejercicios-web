$(document).ready(function(){
	$parrafos = $("#blog p").hide();
	
	$("#blog ul").on("click","li h3",function(e){
		e.preventDefault();
		$(this).siblings().slideDown();
		$(this).parent().siblings().children("p:visible").slideUp();
	});
	
	// //Otra forma de conseguirlo
	// $h3 = $("blog h3");
	// $h3.on('click','a',function(e){
		// e.preventDefault();
		// var $this = $(this);
		// $this.parent().siblings('.excerpt:hidden')
						// .slideDown();
		// $('#blog .except:visible').slideUp();
	// });
});
