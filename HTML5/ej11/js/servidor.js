$(document).ready(function(){
	$.get('http://localhost',function(resp){
		var date = new Date();
		var $servidor = $('#servidor');
		var hora = date.getHours()-2+":"+date.getMinutes()+":"+date.getSeconds();
		$servidor.text(hora);
	});
});
