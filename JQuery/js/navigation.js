$(document).ready(function(){
	
	$("#nav>li").hover(function(e){
		$(this).find("ul").show();		
	},
	function(e){
		$(this).find("ul").hide();
	});
	
	$("#nav li>ul>li").hover(function(e){
		$(this).addClass('hover');
	},
	function(e){
		$(this).removeClass('hover');
	});
	
	//Otra formfa
	// $("#nav li").hover(function(e){
		// var $this = $(this);
		// $this.addClass('hover')
			// .find('ul')
			// .show();
	// },
	// function(e){
		// var $this = $(this);
		// $this.removeClass('hover')
			// .find('ul')
			// .hide();
	// });
});
