var horaLocal = function () {
    var local = document.getElementById('local');
    var t = new Date();

    local.innerHTML = niceTime(t);

    setTimeout(horaLocal, 1000);
};
setTimeout(horaLocal, 1000);