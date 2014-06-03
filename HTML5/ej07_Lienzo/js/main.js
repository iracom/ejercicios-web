$(document).ready(function(){
	
	var canvas = document.getElementById("lienzo");
	var ctx = '';
	var lapizActivo = false;
	
	var activarLapiz = function(e){
		if(canvas.getContext){
			ctx = canvas.getContext('2d');
			ctx.strokeStyle = "black";
			ctx.beginPath();
			ctx.moveTo(e.clientX,e.clientY);
			lapizActivo = true;
			$(this).on("mousemove",dibujar);
		}
	}
	
	var desactivarLapiz = function(e){
		lapizActivo = false;
	}
	
	var dibujar = function(e){
		if(lapizActivo){
			ctx.lineTo(e.clientX,e.clientY);
			ctx.stroke();
		}
	}
	
	$(canvas).on("mousedown",activarLapiz);
	$(canvas).on("mouseup",desactivarLapiz);
});
