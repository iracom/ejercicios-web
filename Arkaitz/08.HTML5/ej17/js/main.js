$(document).ready(function() {
    'use strict';

    var page = 0;

    var content = [
        {
            page: 1,
            url : 'index.html',
            title : 'Página 1',
            content : 'Loren ipsum pagina 1'
        },
        {
            page: 2,
            url : 'pagina2.html',
            title : 'Página 2',
            content : 'Loren ipsum pagina 2'
        },
        {
            page: 3,
            url : 'pagina3.html',
            title : 'Página 3',
            content : 'Loren ipsum pagina 3'
        }
    ];

    var actualizarVista = function(data) {
        $('h1').text(data.title);
        $('p').text(data.content);
    };

    $('#prev').on('click', function(e){
        e.preventDefault();

        if(page > 0) {
            // AJAX: pedir contenido al servidor
            // $.get(...)
            // Actualizar la URL y guardar el estado
            page--;
            history.pushState(content[page], content[page].title, content[page].url);
            // Actualizar la vista con los nuevos datos
            actualizarVista(content[page]);
        }
    });

    $('#next').on('click', function(e){
        e.preventDefault();

        if(page < 2) {
            // AJAX: pedir contenido al servidor
            // $.get(...)
            // Actualizar la URL y guardar el estado
            page++;
            history.pushState(content[page], content[page].title, content[page].url);
            // Actualizar la vista con los nuevos datos
            actualizarVista(content[page]);
        }
    });

    window.onpopstate = function(event) {
        if(event.state) {
            // Mostrar el nuevo estado
            actualizarVista(event.state);
        } else {
            // Mostrar el contenido por defecto
            actualizarVista(content[0]);
        }
    };
});