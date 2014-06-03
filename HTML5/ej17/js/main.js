window.onload = function() {
	var anterior = document.getElementById('anterior');
	var siguiente = document.getElementById('siguiente');
	var $h1 = $('h1');
	var $contenido = $('#contenido');
	var actual = 0;

	var paginas = [{
		page : 1,
		titulo : 'pagina1',
		contenido : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque placerat dui, vel auctor nisi tempus et. Morbi quam est, cursus id lacus ac, venenatis vehicula lacus. Donec elementum sagittis quam ut bibendum. Maecenas leo felis, rhoncus et nibh tincidunt, aliquet faucibus augue. Morbi felis erat, lobortis ac hendrerit quis, mattis eu lacus. Aliquam id orci interdum, auctor ipsum nec, ullamcorper felis. Donec vestibulum lacinia interdum. Donec urna metus, dictum eget erat at, adipiscing convallis risus. Ut dolor nunc, venenatis nec pretium sit amet, molestie eget est. Proin ultrices varius purus a vehicula. Integer in ornare quam. Fusce condimentum ultrices nisi, eu consectetur sem dapibus a.'
	}, {
		page : 2,
		titulo : 'pagina2',
		contenido : 'Donec rhoncus, nulla eu congue dictum, diam felis lacinia sapien, non pulvinar orci nulla non est. Praesent dignissim nisi vel lacus cursus pulvinar. Maecenas ut nisl mollis, semper ante consectetur, commodo quam. Nulla at interdum tellus, a malesuada dolor. Quisque non pellentesque libero. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec at urna odio. Cras felis enim, sollicitudin eu odio eu, sagittis egestas lectus. Mauris dignissim nec sapien et sodales. Nulla rutrum non ante eu sodales. Aliquam erat volutpat. Cras condimentum posuere nunc ac mattis. In dui sapien, vehicula at mollis ac, feugiat vitae lectus. Morbi non mauris et sapien elementum blandit vel nec turpis.'
	}, {
		page : 3,
		titulo : 'pagina3',
		contenido : 'Vestibulum fermentum tristique eros, eu rutrum quam consequat commodo. Suspendisse scelerisque, odio quis tincidunt hendrerit, ipsum turpis placerat erat, eleifend semper massa nisi ut ante. Proin cursus imperdiet dui eget interdum. Integer tincidunt sem non ligula pharetra tempus. Integer ullamcorper augue vel dignissim semper. Etiam vehicula elit lacus, vel dapibus odio ullamcorper ut. Quisque vulputate quam dolor, ac egestas dui cursus vitae. Nulla sodales feugiat interdum. Quisque ut sapien at risus adipiscing suscipit nec nec arcu. Etiam diam turpis, semper non ornare ac, vulputate imperdiet augue. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla quis cursus turpis, at commodo lorem. Morbi scelerisque rhoncus bibendum. Nulla pellentesque nec velit quis euismod. Nulla ipsum nisl, luctus eget dolor id, euismod facilisis sapien. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;'
	}];

	window.onpopstate = function(e) {
		if (!event.state) {
			actual = 0;
			modificarVista(paginas[actual]);
		} else {
			modificarVista(event.state);
		}
	}
	
	var modificarVista = function(estado) {
		$h1.text(estado.titulo);
		$contenido.text(estado.contenido);
	}
	
	var paginaSiguiente = function(e) {
		e.preventDefault();
		
		if(actual<paginas.length-1){
			actual++;
			console.log(paginas[actual]);
			history.pushState(paginas[actual], 'Pagina' + paginas[actual].page, 'pagina' + paginas[actual].page + '.html');
			modificarVista(paginas[actual]);
		};
	}
	
	var paginaAnterior = function(e) {
		e.preventDefault();
		
		if(actual>0){
			actual--;
			history.pushState(paginas[actual], 'Pagina' + paginas[actual].page, 'pagina' + paginas[actual].page + '.html');
			modificarVista(paginas[actual]);
		};
	}

	anterior.addEventListener('click', paginaAnterior, false);
	siguiente.addEventListener('click', paginaSiguiente, false);
}
