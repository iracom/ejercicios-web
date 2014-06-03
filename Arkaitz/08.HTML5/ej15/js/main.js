$(document).ready(function () {
    "use strict";
 
    var $content = $('#content'),
        $input = $('#input'),
        $status = $('#status');
 
    var myColor = false;
    var myName = false;
 
    window.WebSocket = window.WebSocket || window.MozWebSocket;
 
    if (!window.WebSocket) {
        $content.html($('<p>', { text: 'Sorry, but your browser doesn\'t '
                                    + 'support WebSockets.'} ));
        $input.hide();
        $('span').hide();
        
        return;
    }
 
    // var connection = new WebSocket('ws://127.0.0.1:1337');
    var connection = new WebSocket('ws://www.arkaitzgarro.com:1337');
 
    connection.addEventListener('open', function (e) {
        $input.removeAttr('disabled');
        $status.text('Nick:');
    });
 
    connection.addEventListener('error',  function (error) {
        // Hay un problema con la conexión
        $content.html($('<p>', { text: 'Sorry, but there\'s some problem with your '
                                    + 'connection or the server is down.' } ));
    });
 
    // Mensajes entrantes
    connection.addEventListener('message', function (message) {
        try {
            var resp = JSON.parse(message.data);
        } catch (e) {
            console.log('No parece un JSON valido: ', message.data);
            return;
        }
 
        if (resp.type === 'color') {
            // La primera respuesta es el color
            myColor = resp.data;
            $status.text(myName + ': ').css('color', myColor);
            // Podemos comenzar a enviar mensajes
            $input.removeAttr('disabled').focus();
        } else if (resp.type === 'history') {
            // Historial de chats
            for (var i=0; i < resp.data.length; i++) {
                addMessage(resp.data[i].author, resp.data[i].text,
                           resp.data[i].color, new Date(resp.data[i].time));
            }
        } else if (resp.type === 'message') {
            // Mensaje único
            addMessage(resp.data.author, resp.data.text,
                       resp.data.color, new Date(resp.data.time));
        } else {
            console.log('Formato de mensaje desconocido: ', resp);
        }
    });
 
    /**
     * Enviar un mensaje al pulsar enter
     */
    $input.keydown(function(e) {
        var $this = $(this);
        if (e.keyCode === 13) {
            var msg = $this.val();
            if (msg.length === 0) {
                return;
            }

            // Enviar el mensaje como texto plano
            connection.send(msg);
            $this.val('');
 
            // Guardar el nombre si es el primer mensaje
            if (myName === false) {
                myName = msg;
            }
        }
    });
 
    /**
     * Comprueba el estado del servidor cada 3 segundos
     */
    // setInterval(function() {
    //     if (connection.readyState !== 1) {
    //         $status.text('Error');
    //         input.attr('disabled', 'disabled').val('Unable to comminucate '
    //                                              + 'with the WebSocket server.');
    //     }
    // }, 3000);
 
    /**
     * Añadir un mensaje a la ventana de chats
     */
    function addMessage(author, message, color, dt) {
        $content.prepend('<p><span style="color:' + color + '">' + author + '</span> @ ' +
             + (dt.getHours() < 10 ? '0' + dt.getHours() : dt.getHours()) + ':'
             + (dt.getMinutes() < 10 ? '0' + dt.getMinutes() : dt.getMinutes())
             + ': ' + message + '</p>');
    }
});