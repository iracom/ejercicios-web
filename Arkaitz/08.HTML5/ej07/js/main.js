$(document).ready(function(){
    var $canvas = $("#canvas"),
        canvas = $canvas[0],
        ctx = canvas.getContext('2d'),
        mousePressed = false;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    $canvas.on('mousedown tap', function(e) {
        var $this = $(this);

        mousePressed = true;
        draw(e.pageX - $this.offset().left, e.pageY - $this.offset().top, false);
    });

    $canvas.on('mousemove', function(e) {
        var $this = $(this);

        if(mousePressed)
            draw(e.pageX - $this.offset().left, e.pageY - $this.offset().top, true);
    });

    $canvas.on('mouseup', function (e) {
        mousePressed = false;
    });

    var drawHead = function() {
        // ctx.moveTo(window.innerWidth/2, 100);
        ctx.arc(500, 100, 50, 0, Math.PI*2, false);
        ctx.fill();

        ctx.beginPath();
        ctx.strokeStyle = "#C00";
        ctx.lineWidth = 5;
        ctx.arc(500, 100, 35, 0, Math.PI, false);
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = "#C00";
        ctx.arc(485, 85, 5, 0, Math.PI*2, false);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = "#C00";
        ctx.arc(515, 85, 5, 0, Math.PI*2, false);
        ctx.fill();

        ctx.beginPath();
        ctx.strokeStyle = "000";
        ctx.lineWidth = 5;
        ctx.moveTo(500,150);
        ctx.lineTo(500,180);
        ctx.lineTo(460,220);
        ctx.moveTo(500,180);
        ctx.lineTo(540,220);
        ctx.moveTo(500,180);
        ctx.lineTo(500,280);
        ctx.lineTo(460,320);
        ctx.moveTo(500,280);
        ctx.lineTo(540,320);
        ctx.stroke();
    }

    var draw = function(x, y, isDown) {
        if (isDown) {
            ctx.beginPath();
            ctx.strokeStyle = "#000";
            ctx.lineWidth = 5;
            ctx.lineJoin = "round";
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(x, y);
            ctx.closePath();
            ctx.stroke();
        }
        lastX = x; lastY = y;
    }

    drawHead();
});