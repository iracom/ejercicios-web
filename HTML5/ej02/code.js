$(document).ready(function(){
	var $input = $("form :input");
	
	$("progress").attr('max',$input.length-1);
	
	$input.on('blur',function(e){
		var $this = $(this);
		
		if($this.val().length > 0){
			$("progress").attr('value',parseInt($("progress").attr('value'))+1);
		}
	})
});
