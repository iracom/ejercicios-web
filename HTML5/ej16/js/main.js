$(document).ready(function(){
	if(window.File && window.FileReader && window.FileList && window.Blob){
		var files = document.getElementById('files');
		var imagenes = document.getElementById("imagenes");
		
		var adjuntarImagenes = function(archivos){
			for (var i=0; i<archivos.length; i++){
				var file = archivos[i];
				if(file.type.match('image.*') && file.size <= 100000){
					var reader = new FileReader();
					reader.onload = (function(theFile){
						return function(e){
							var span = document.createElement('span');
							span.innerHTML = ['<img class="thumb" src="', e.target.result,'" title="',escape(theFile.name),'"/>'].join('');
							imagenes.appendChild(span);
						}
					})(file);
					reader.readAsDataURL(file);
				}
				else if(file.size >100000){
					alert ("La imagen es demasiado grande");
				}
				else {
					alert ("No es una imagen");
				}
			}
		}
		
		var handleFileSelect = function(e){
			e.preventDefault();
			var archivos = e.target.files;
			adjuntarImagenes(archivos);
		}
		
		files.addEventListener('change',handleFileSelect,false);
		//files.addEventListener('change',validarFicheros,false);	--Lo ideal sería tener dos listeners, uno que valide el fichero: Que sea imagen, tamaño adecuado... 
		//files.addEventListener('change',mostrarImgs,false);	--El otro es para mostrar imagenes. Este también tiene que comprobar que los archivos son imagenes.
		
		var handleDragOver = function(e) {
		    if (e.preventDefault) {
		        e.preventDefault(); // Necessary. Allows us to drop.
		    }
		    e.dataTransfer.dropEffect = 'copy';
		    return false;
		}
		
		var handleDrop = function(e){
			e.preventDefault();
			var archivos = e.dataTransfer.files;
			adjuntarImagenes(archivos);
		}
		
		imagenes.addEventListener('dragover',handleDragOver);
		imagenes.addEventListener('drop',handleDrop);
	}
	else{
		alert('Este navegador no soporta los APIs de archivos');
	}
});
