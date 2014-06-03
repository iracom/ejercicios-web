$(document).ready(function(){
	
	var canvas = document.getElementById("lienzo");
	if(canvas.getContext){
		var ctx = canvas.getContext('2d');
		
		//Crear fondo
		ctx.fillStyle = "black";
		ctx.beginPath();
		ctx.fillRect(0,0,200,300);
		
		//Dibujar cabeza
		ctx.fillStyle = "#FFF";
		ctx.beginPath();
		ctx.arc(100,50,30,0,Math.PI * 2,true);
		ctx.fill();
		
		//Dibujar boca
		ctx.strokeStyle = "#c00";
		ctx.beginPath();
		ctx.arc(100,50,20,0,Math.PI,false);
		ctx.stroke();
		
		//Dibujar ojos
		ctx.fillStyle = "#c00";
		ctx.beginPath();
		ctx.arc(90,45,3,0,Math.PI * 2,true);
		ctx.fill();
		ctx.beginPath();
		ctx.arc(110,45,3,0,Math.PI * 2,true);
		ctx.fill();
	}
	
});
