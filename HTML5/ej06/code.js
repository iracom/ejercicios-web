$(document).ready(function(){
	var $video = $("video"),
		video = $video[0];
	$iniciar = $("input[name=iniciar]");
	$pausa = $("input[name=pausa]");
	$parar = $("input[name=parar]");
	$avanzar = $("input[name=avanzar]");
	$retroceder = $("input[name=retroceder]");
	$inicio = $("input[name=inicio]");
	$fin = $("input[name=fin]");
	$pantallaCompleta = $("input[name=pantallaCompleta]");
	$volumen = $("input[type=range]");
	$progreso = $("progress");
	$videos = $("#videos");

	
	var iniciarDatos = function() {
		$volumen.val(video.volume*100);//Esto lo hacemos porque el volumen va de 0 a 1.
		$progreso.attr('max', video.duration);
		$progreso.attr('value', 0);
	}	
	var iniciarVideo = function(){
		if(video.paused){
			video.play();
		}
		else{
			video.pause();
		}
	}
	var pausarVideo = function(){
		video.pause();
	}
	var pararVideo = function(){
		video.pause();
		video.currentTime = 0;
	}
	var avanzarVideo = function(){
		video.currentTime += 10; 
	}
	var retrocederVideo = function(){
		video.currentTime -= 10; 
	}
	var irInicio = function(){
		video.currentTime = 0;
	}
	var irFin = function(){
		video.currentTime = video.duration;
	}
	var pantallaCompleta = function(){
		if (video.requestFullscreen) {
		  video.requestFullscreen();
		} else if (video.msRequestFullscreen) {
		  video.msRequestFullscreen();
		} else if (video.mozRequestFullScreen) {
		  video.mozRequestFullScreen();
		} else if (video.webkitRequestFullscreen) {
		  video.webkitRequestFullscreen();
		}
	}
	var cambiarVolumen = function(){
		video.volume = $(this).val()/100;
	}
	var actualizarProgreso = function(){
		$progreso.attr('value', video.currentTime);
	}
	var cargarVideo = function(e){
		//var dir = this.getAttribute("data-dir");
		var dir = this.dataset.dir;
		
		if(Modernizr.video && Modernizr.video.h264){
			$video.attr('src',dir+".mp4");
			$video.attr('type','video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
		}
		if(Modernizr.video && Modernizr.video.webm){
			$video.attr('src',dir+".webm");
			$video.attr('type','video/webm; codecs="vp8, vorbis"');
		}
	}
	
	$iniciar.on("click",iniciarVideo);
	$pausa.on("click",pausarVideo);
	$parar.on("click",pararVideo);
	$avanzar.on("click",avanzarVideo);
	$retroceder.on("click",retrocederVideo);
	$inicio.on("click",irInicio);
	$fin.on("click",irFin);
	$pantallaCompleta.on("click",pantallaCompleta);
	$volumen.on("change",cambiarVolumen);
	$video.on('timeupdate',actualizarProgreso);
	$videos.on("click",'li',cargarVideo);
	$video.on('canplay', iniciarDatos);
});
