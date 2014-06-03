(function() {
    // Variable privada
    var PI = 3.1415926;

    // Método privado
    var funcionAyuda = function(valor) {
        // code...
    };

    var validarObligatorio = function(valor) {
        return !(valor === undefined || valor === null || valor.length === 0 || /^\s+$/.test(valor));
    };

    var validarObligatorios = function() {
        for (var i = 0; i < arguments.length; i++) {
            if(!this.obligatorio(arguments[i])) return false;
        }
        return true;
    };

    var validarEmail = function(valor) {
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,6})+$/;
        return filter.test(valor);
    };

    var validarPassword = function(valor) {
        var may = /[A-Z]/;
        var min = /[a-z]/;
        var dig = /[0-9]/;
        return (valor.length >= 6) && may.test(valor) && min.test(valor) && dig.test(valor);
    };

    var validarMax = function(valor, maximo) {
        return validarObligatorio(valor) && valor.length <= maximo;
    };
    
    var validarNumero = function(valor) {
    	var filter = /^[0-9]+$/;
    	return filter.test(valor);
    }
    
    var validarUrl = function(valor) {
    	var filter = /^(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)( [a-zA-Z0-9\-\.\?\,\'\/\\\+&%\$#_]*)?$/;
    	return filter.test(valor);
    }

    var validador = {
        obligatorio : validarObligatorio,
        obligatorios : validarObligatorios,
        email : validarEmail,
        password : validarPassword,
        max : validarMax,
        numero: validarNumero,
        url: validarUrl
    };

    window.validar = validador;
})();