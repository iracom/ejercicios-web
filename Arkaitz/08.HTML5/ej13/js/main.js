$(document).ready(function() {
    // Calcular posición
    if(!Modernizr.geolocation) { 
        alert('El explorador NO soporta geolocalización'); 
    } else {
        var points = [], map;
        // navigator.geolocation.getCurrentPosition(function(position) {
        //     showData(position);
        //     map = createMap(position);
        //     addMarker(position, map);
        // });

        navigator.geolocation.watchPosition(function(position) {
            console.log(position);
            showData(position);
            points.push(position);
            if(points.length === 1)
                map = createMap(position);

            addMarker(position, map);
        }, function(error) {
            console.log(error.message);
        },
        { enableHighAccuracy: true }
        );
    }

    function showData(position) {
        var status = document.getElementById("status");
        status.innerHTML = "("+position.coords.latitude+","+position.coords.longitude+")";

        var velocidad = document.getElementById("velocidad");
        var speed = position.coords.speed;
        if (speed === null || speed === 0) {
            velocidad.innerHTML = "parado";
        } else {
            velocidad.innerHTML = speed + "Mps";
        }
    }

    function createMap(position) {
        var mapcanvas = document.createElement('div');
        mapcanvas.id = 'mapcanvas';
        mapcanvas.style.height = '400px';
        mapcanvas.style.width = '560px';

        document.querySelector('article').appendChild(mapcanvas);

        var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        var myOptions = {
            zoom: 15,
            center: latlng,
            mapTypeControl: false,
            navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById("mapcanvas"), myOptions);

        return map;
    }

    function addMarker(position, map) {
        var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: "¡Usted está aquí!"
        });
    }
});