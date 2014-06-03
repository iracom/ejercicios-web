// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

function testOnline(fn) {
    var script = document.createElement('script');
    script.src = 'js/online.js';
    // alias the setOnline function to the new function that was passed in
    window.setOnline = function (online) {
        document.body.removeChild(script);
        fn(online);
    };

    // attaching script node trigger the code to run
    document.body.appendChild(script);
}

testOnline(function (online) {
    if (online) {
        console.log("Online");
    } else {
        console.log("Offline");
    }
});

function niceTime(t) {
  return t.getHours() + ':' + two(t.getMinutes()) + ':' + two(t.getSeconds());
}

function two(s) {
  return (s+'').length == 2 ? s : '0' + s;
}

// Place any jQuery/helper plugins in here.
