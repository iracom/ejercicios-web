$(function () {
    "use strict";

    // Obtener los elementos del DOM
    var $status = $("#status");
    var $input = $("#input");
    var content = $("#content");

    // Mi color asignado por el servidor
    var myColor = false;
    // Mi nick
    var myName = false;
    var nick = '';

    // Comprobar la disponibilidad de Web Socket en el navegador
    if (Modernizr.WebSocket) {
        return false;
    }

    window.WebSocket = window.WebSocket || window.MozWebSocket;

    // Abrir la conexion con ws://www.arkaitzgarro.com:1337
    var socket = new WebSocket('ws://www.arkaitzgarro.com:1337');
    // 1. Al abrir la conexión, solicitar el nick.
    socket.onopen = function(e){		//Mejor utilizar esto: socket.addEventListener(open,function(e){}))
    	$status.text('Nik de usuario:');
    	$input.removeAttr('disabled');
    	console.log('socket abierto');
    };
    $input.on('keyup',teclaPulsada);
    // 2. Controlar posibles errores del servidor.
    socket.onerror = function(e){}; 
    // 3. Escucar los mensajes del servidor, y mostrarlos en el elemento "content"
    socket.onmessage = function(e){
    	try{
    		var obj = JSON.parse(e.data);
	    	if(obj.type === 'color'){
	    		console.log(obj);
	    		$status.text(nick);
	    		myColor = true;
	    		//$status.css('color: ', obj.data);
	    		document.getElementById('status').style.color = obj.data;
	    	}
	    	else if (obj.type === 'history'){
	    		for(var i=0;i<obj.data.length;i++){
	    			var data = obj.data[i];
	    			var fecha = new Date(data.time);
	    			addMessage(data.author,data.text,data.color,fecha);
	    		}
	    	}
	    	else if (obj.type === 'message'){
	    		var data = obj.data;
	    		var fecha = new Date(data.time);
	    		addMessage(data.author,data.text,data.color,fecha);
	    	}
    	}catch(ex){
    		console.log("Error");
    	}
    }
    // 4. La estructura del objeto enviado por el servidor es la siguiente:
    //      {
    //          // Contiene el tipo de mensaje recibido
    //          type : @string in ['color', 'history', 'message'],
    //          // Contiene los datos según el tipo de mensaje recibido
    //          data: @Object {author, text, color, time}
    //      }
    // 5. Enviar un mensaje al pulsar enter. El mensaje enviado es únicamente la cadena de caracteres.

    /**
     * Añadir el mensaje a la ventana de chat
     */
    function addMessage(author, message, color, dt) {
        content.prepend('<p><span style="color:' + color + '">' + author + '</span> @ ' +
             + (dt.getHours() < 10 ? '0' + dt.getHours() : dt.getHours()) + ':'
             + (dt.getMinutes() < 10 ? '0' + dt.getMinutes() : dt.getMinutes())
             + ': ' + message + '</p>');
    }
    
    /**
     * Se ha pulsado una tecla 
     */
    function teclaPulsada(e){
    	e.preventDefault();
    	var $this = $(this);
    	if($this.val().length > 0){
    		if(e.keyCode === 13){
    			if(!myName){
    				nick = $this.val();
    				myName = true;
    			}
    			socket.send($this.val());
    			$this.val('');
    		}
    	}
    }
});