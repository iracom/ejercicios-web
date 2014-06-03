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

this.addEventListener('message', function(e) {
    var num = e.data;

    var primos = calcularPrimos(parseInt(num));

    postMessage(JSON.stringify(primos));
    close();
});