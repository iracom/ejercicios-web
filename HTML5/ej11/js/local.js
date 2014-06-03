$(document).ready(function(){
	var date = new Date();
	var $local = $('#local');
	var hora = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
	$local.text(hora);
});
