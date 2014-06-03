$(document).ready(function() {
    // Calcular posición
    if(!Modernizr.webworkers) { 
        alert('El explorador NO soporta Web Workers'); 
    } else {
        var $num = $("#num"),
            $btn = $("#calcular"),
            $res = $("#resultado strong"),
            $time = $("#tiempo strong"),
            start, end;

        var mostrarResultado = function(e) {
            end = new Date();

            $res.html(JSON.parse(e.data).join(' '));
            $time.html((end.getTime()-start.getTime()) + 'ms');
        }

        var mostrarError = function(e) {
            console.log(['ERROR: Line ', e.lineno, ' in ', e.filename, ': ', e.message].join(''));
        }

        $btn.on('click', function(e) {
            var worker = new Worker('js/worker.js');
            worker.addEventListener('message', mostrarResultado, false);
            worker.addEventListener('error', mostrarError, false);

            start = new Date();
            worker.postMessage(parseInt($num.val()));
        });

        // $btn.on('click', function(e) {
        //     start = new Date();
        //     $res.html(calcularPrimos(parseInt($num.val())).join(' '));
        //     end = new Date();

        //     $time.html((end.getTime()-start.getTime()) + 'ms');
        // });
    }

    var calcularPrimos = function(num) {
        var primos = [];

        for (i = 1; i <= num ; i++){ 
             
            if (esPrimo(i)){ 
                primos.push(i); 
            } 
        } 

        return primos;
    }

    var esPrimo = function(num){
        var divisor=1;
        var primo=0;
        
        for(var i=0; i<=num; i++){
            if(num%i === 0 ){
                primo++;
            }
            if(primo > 2)
                break;
        }

        return primo === 2;
    }
});