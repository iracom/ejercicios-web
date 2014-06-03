var esPrimo = function(numero){
	var divisor=1;
	var primo=0;
	for(var i=0; i<=numero; i++){
    	if(numero%i==0 ){
    		primo++;
    	}
    	if(primo>2)
    		break;
    }  
    if(primo==2){
        return true;
    }    
    else{
    	return false;
	}	
}

self.addEventListener('message',function(e){
	var primos = [];
	for(var i=1; i<=e.data; i++){
		if(esPrimo(i)){
			primos.push(i);
		}
	}
	postMessage(JSON.stringify(primos));
});
