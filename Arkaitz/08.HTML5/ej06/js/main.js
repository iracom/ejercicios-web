$(document).ready(function(){
    var $video = $("#player"),
        video  = $video[0],
        $volumen = $("#volumen"),
        $progreso = $("#progreso");

    video.addEventListener('canplay', function(e) {
        $volumen.val(this.volume*100);
        $progreso.val(0);
        $progreso.attr('max', this.duration);
    });

    video.addEventListener('click', function(e) {
        if(this.paused)
            video.play();
        else
            video.pause();
    });

    video.addEventListener('timeupdate', function(e) {
        $progreso.val(this.currentTime);
    });

    $("#controls button, .tracklist a").on('click', function(e) {
        e.preventDefault();
    });

    $("#iniciar").on('click', function(e) {
        video.play();
    });

    $("#pausa").on('click', function(e) {
        if(video.paused)
            video.play();
        else
            video.pause();
    });

    $("#parar").on('click', function(e) {
        video.pause();
        video.currentTime = 0;
    });

    $("#retroceder").on('click', function(e) {
        video.currentTime -= 10;
    });

    $("#avanzar").on('click', function(e) {
        video.currentTime += 10;
    });

    $("#inicio").on('click', function(e) {
        video.currentTime = 0;
    });

    $("#fin").on('click', function(e) {
        video.pause();
        video.currentTime = video.duration-0.1;
    });

    $("#pantalla-completa").on('click', function(e) {
        doFullScreen(video);
    });

    $("#volumen").on('change', function(e) {
        video.volume = this.value/100;
    });

    $(".tracklist a").click(function(e){
        var track = this.dataset.video;

        if(Modernizr.video && Modernizr.video.h264 === "probably") {
            video.src = "videos/"+track+".mp4";
        } else if(Modernizr.video && Modernizr.video.webm === "probably") {
            video.src = track + ".webm";
        }
    });

    function doFullScreen() {
        var isInFullScreen = (document.fullScreenElement && document.fullScreenElement !== null) ||    // alternative standard method
                                (document.mozFullScreen || document.webkitIsFullScreen);

        if (!isInFullScreen) {

            if (video.requestFullscreen) {
                video.requestFullscreen();
            }
            else if (video.mozRequestFullScreen) {
                video.mozRequestFullScreen();
            }
            else if (video.webkitRequestFullScreen) {
                video.webkitRequestFullScreen();
            }
        }
    }
});