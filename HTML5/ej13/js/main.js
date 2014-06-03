$(document).ready(function() {
    // Calcular posición
    var id = document.getElementById('status');
    
    if(navigator.geolocation){
    	navigator.geolocation.getCurrentPosition(function(position){
	    	id.innerHTML="Latitud: " + position.coords.latitude + " , Longitud: " + position.coords.longitude;
	    	showMap(position);
	    });
    };
    
    // if(navigator.geolocation){
    	// navigator.geolocation.watchPosition(function(geodata){
    		// var speed = geodata.coords.speed || 0;
	    	// id.innerHTML="Latitud: " + geodata.coords.latitude + " , Longitud: " + geodata.coords.longitude + " | Velocidad: " + speed + " Mps";
	    	// showMap(geodata);
	    // });
    // };
    
    function showMap(position) {
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
        var map = new google.maps.Map(document.getElementById("mapcanvas"), myOptions);

        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: "¡Usted está aquí!"
        });
    }

});