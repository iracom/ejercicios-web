$('document').ready(function(){
	var $label = $("#search label");
	var $texto = $label.text();
	var $input = $("input[name='q']"); //otra forma: $label.next(".input_text");
	$input.val($texto).addClass('hint');
	
	$label.remove();
	
	$input.on({
		'focus': function(e){
			$(this).val(""); //otra forma: this.innerText=""; Esto sería javascript
			$(this).removeClass('hint');
		},
		'blur': function(e){
			if($(this).val().trim().length == 0){
				$(this).val($texto);
				$(this).addClass('hint');
			}
		}
	});
});
