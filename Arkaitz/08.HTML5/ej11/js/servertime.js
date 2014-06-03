var horaServidor = function() {
    var servertime = new Date().getTime()-7200*1000;
    var servidor = document.getElementById('servidor');
    servidor.innerHTML = niceTime(new Date(servertime));

    setTimeout(horaServidor, 1000);
};
setTimeout(horaServidor, 1000);
