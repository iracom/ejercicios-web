$(document).ready(function(){
    var storage = localStorage;
    // var storage = sessionStorage;
    var $input = $("#registro :input");
    var form = {};

    $input.not(':checkbox').on('blur', function(e){
        var $this = $(this);

        form[this.name] = $this.val();
        storage.setItem("form", JSON.stringify(form));
    });

    var actualizar = function(e) {
        form = JSON.parse(e.storageArea.getItem("form"));
        
        for (key in form) {
            $input.filter("[name='" + key +"']").val(form[key]);
        };
    };

    if(storage && storage.getItem("form").length > 0) {
        actualizar({
            storageArea: storage
        });
    }

    window.addEventListener("storage", actualizar, false);
});