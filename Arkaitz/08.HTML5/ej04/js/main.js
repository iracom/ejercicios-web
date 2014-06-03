Modernizr.load({
    test : Modernizr.inputtypes.date,
    nope : ['js/vendor/jquery-ui/js/jquery-ui.custom.min.js', 'js/vendor/jquery-ui/css/ui-lightness/jquery-ui.custom.min.css'],
    callback: function (url, result, key) {
        if(key == 1) { // this.nope.length
            $("#date").datepicker();
        }
    }
  }
);
