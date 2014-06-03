$(document).ready(function() {
    'use strict';

    if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
        console.log('The File APIs are not fully supported in this browser.');
        return;
    }

    var $avatar = $('#avatar'),
        $form = $('form'),
        $images = $('#images');

    var checkFile = function(e) {
        var files = e.target.files,
            l = files.length;

        for (var i = 0; i < l; i++) {
            var f = files[i];

            if (!f.type.match('image.*')) {
                console.log('El fichero ' + f.name + ' no es una imagen');
                return false;
            }

            if ((f.size/1024) > 100) {
                console.log('El fichero ' + f.name + ' super el tamaño máximo permitido [100KB]');
                return false;
            }
        }

        return true;
    };

    var showImages = function(e) {
        var files = e.target.files || e.dataTransfer.files,
            l = files.length;

        var readFile = function(f){
            return function(e) {
                // Render thumbnail.
                var img = ['<img class="thumb" src="', e.target.result,
                                  '" title="', f.name, '"/>'].join('');
                $images.append(img, null);
            };
        };

        for (var i = 0; i < l; i++) {
            var f = files[i];

            if (!f.type.match('image.*')) {
                continue;
            }

            var reader = new FileReader();
            reader.onload = readFile(f);

            reader.readAsDataURL(f);
        }
    };

    $avatar.on('change', checkFile);
    $avatar.on('change', showImages);
    $form.on('submit', checkFile);

    $images[0].addEventListener('dragover', function(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }
        e.dataTransfer.dropEffect = 'copy';
        return false;
    });

    $images[0].addEventListener('drop', function(e) {
        e.preventDefault();
        if (e.stopPropagation) {
            e.stopPropagation(); // stops the browser from redirecting.
        }

        // showImages.call(this, {target : {files : e.dataTransfer.files}});
        showImages(e);
        // See the section on the DataTransfer object.
        return false;
    });
});