$(document).ready(function() {
    $('img').on('dragstart', function(e){
        return false;
    });

    var prods = document.querySelectorAll('.product');
    var drop  = document.getElementById('drop');

    var origen, destino;

    var cesta = {};
    if(localStorage.getItem("cesta").length > 0) {
        cesta = JSON.parse(localStorage.getItem("cesta"));
    } {
        cesta.productos = [];
        cesta.total = 0;
    }

    var handleDragStart = function(e) {
        console.log('Comienza el arrastre del objeto');
        this.style.opacity = '0.4';
        origen = e.target;

        var data = {
            id : this.dataset.id,
            name : this.dataset.name,
            img : this.dataset.img,
            prize : this.dataset.prize
        };

        e.dataTransfer.effectAllowed = 'copy';
        e.dataTransfer.setData('text/html', JSON.stringify(data));
    };

    var handleDragEnd = function(e) {
        console.log('Finaliza el arrastre del objeto');
        this.style.opacity = '1';
    };
    
    [].forEach.call(prods, function(prod) {
        prod.addEventListener('dragstart', handleDragStart, false);
        prod.addEventListener('dragend', handleDragEnd, false);
    });

    var handleDragEnter = function(e) {
        console.log('Entra en el elemento contenedor');
        destino = e.target;
        $(e.target).addClass('hover');
    }

    var handleDragLeave = function(e) {
        console.log('Sale del elemento contenedor');
        destino = null;
        $(e.target).removeClass('hover');
    }

    var handleDragOver = function(e) {
        console.log('Elemento sobre el contenedor');
        e.preventDefault();
        
        e.dataTransfer.dropEffect = 'copy';
        return false;
    }

    var handleDrop = function(e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        }

        // TODO: no añadir elementos repetidos
        // Calcular la cesta de la compra
        var producto = JSON.parse(e.dataTransfer.getData('text/html'));
    }

    drop.addEventListener('dragenter', handleDragEnter, false);
    drop.addEventListener('dragleave', handleDragLeave, false);
    drop.addEventListener('dragover', handleDragOver, false);
    drop.addEventListener('drop', handleDrop, false);
});
