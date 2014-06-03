window.onload = function(){
	
	//var imgs = document.querySelectorAll('img');
	var productos = document.querySelectorAll('.product');
	var carrito = document.querySelectorAll('#drop');

	var cantidad = document.getElementById("cantidad").textContent || 0;;
	var total = document.getElementById("total").textContent || 0;
	
	var cesta = {};
	if(localStorage.getItem("cesta").legth>0){
		cesta = JSON.parse(localStorage.getItem("cesta"));
	}
	else {
		cesta.productos = [];
		cesta.total= 0;
	}
	
	var comienzaMov = function(e){
		carrito[0].style.backgroundColor = "yellow";
		
		this.style.opacity = '0.4';
		origen = e.target;
		
		var data = {
			id=this.dataset.id,
			name= this.dataset.name,
			img=this.dataset.img,
			prize=this.dataset.prize
		};
		
		e.dataTransfer.effectAllowed= 'copy';
		e.dataTransfer.setData('text/html',JSON.stringify(data));
	}
	
	var finMov = function(e){
		carrito[0].style.backgroundColor = "#efefef";
		this.style.opacity = '1';
	}
	
	Array.prototype.forEach.call(productos, function(producto){ //[].forEach.call
		producto.addEventListener('dragstart',comienzaMov);
		producto.addEventListener('dragend',finMov);
	});
	
	var handleDragEnter = function(){
		destino = e.target;
		$(e.target).addClass('hover');
	}
	
	var handleDragLeave = function(){
		destino = null;
		$(e.target).removeClass('hover');
	}
	
	var handleDragOver = function(e) {
	    if (e.preventDefault) {
	        e.preventDefault(); // Necessary. Allows us to drop.
	    }
	    e.dataTransfer.dropEffect = 'copy';
	    return false;
	}
	
	var soltarEnContenedor = function(e){
		if(e.stopPropagation){
			e.stopPropagation();
		}
		var producto = JSON.parse(e.dataTransfer.getData('text/html'));
	}
	
	carrito[0].addEventListener('dragenter',handleDragEnter);
	carrito[0].addEventListener('dragleave',handleDragLeave);
	carrito[0].addEventListener('dragover',handleDragOver);
	carrito[0].addEventListener('drop',soltarEnContenedor);
};
