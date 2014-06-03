var Adapter = {};

Adapter = (function(){
	
	var terremotosWeb;
	var terremotosDB;
	var terremoto;
	
	var webSql = new WebSql();
	
	function Adapter(){
		terremotosDB = [];
		terremotosWeb = [];
		terremoto = {};
	}
	
	Adapter.prototype.obtenerDatosJSON = function(url, data){
		var url = url || "app/all_day.geojson";
		var data = data || {};
		var parseResponse = function(result){
			var terremotos = result['features'];
			terremotos.forEach(function(element,index,array){
				terremotosWeb.push(element);
			});
		}
		Lungo.Service.json(url,data,parseResponse);
	}
	
	Adapter.prototype.crearDB = function(mag){
		webSql.init(insertarTerremotos(mag));
	}
	
	var monthNames = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];
	
	var mostrarDetalles = function(terremoto){
		//Región y Magnitud
		var li = document.createElement('li');
		var p1 = document.createElement('p');
		var strong = document.createElement('strong');
		var contenido = document.createTextNode(terremoto.region);
		strong.appendChild(contenido);
		var small = document.createElement('small');
		$$(small).addClass("on-right");
		contenido = document.createTextNode(terremoto.magnitude);
		small.appendChild(contenido);
		li.appendChild(small);
		li.appendChild(strong);
		
		//Fecha y hora
		var fecha = new Date(terremoto.time);
		console.log(fecha.getMonth());
		small = document.createElement('small');
		var span1 = document.createElement('span');
		$$(span1).addClass('icon calendar');
		contenido = document.createTextNode(monthNames[fecha.getMonth()-1] + " " + fecha.getDay() + ", " + fecha.getFullYear());
		small.appendChild(span1);
		small.appendChild(contenido);
		li.appendChild(small);
		small = document.createElement('small');
		var span2 = document.createElement('span');
		$$(span2).addClass('icon time');
		contenido = document.createTextNode(fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds());
		small.appendChild(span2);
		small.appendChild(contenido);
		li.appendChild(small);
		
		var ul = $$("#detalles").children('ul');
		ul.html(li);
	}
	
	var guardarIdTerremoto = function(e){
		e.preventDefault();
		var $this = $$(this);
		webSql.getTerremotoById($this.attr('id'),mostrarDetalles);
	}
	
	var mostrarTerremoto = function(terremoto){
		//Crear lista para añadir
		var li = document.createElement('li');
		$$(li).addClass('arrow').attr('id',terremoto.id).data('view-section','terremoto').on('tap',guardarIdTerremoto);
		var p1 = document.createElement('p');
		var p2 = document.createElement('p');
		var contenido = document.createTextNode(terremoto.magnitude + " " + terremoto.region);
		p1.appendChild(contenido);
		li.appendChild(p1);
		var fecha = document.createTextNode(new Date(terremoto.time));
		var small = document.createElement('small');
		small.appendChild(fecha);
		p2.appendChild(small);
		li.appendChild(p2);
		(document.getElementById("terremotos")).appendChild(li);
		//console.log(terremoto.magnitude + " " + terremoto.region + " " + new Date(terremoto.time));
	}
	
	function showMap(coords) {
        var mapcanvas = document.createElement('div');
        mapcanvas.id = 'mapcanvas';
        mapcanvas.style.height = '400px';
        mapcanvas.style.width = '560px';

        (document.getElementById('world-map')).appendChild(mapcanvas);

        var latlng = new google.maps.LatLng(coords[0], coords[1]);
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
            title: "Terremotos"
        });
    }
	
	var mostrarTerremotoMapa = function(terremoto){
		var coords = terremoto.location.split(",");
		showMap(coords);
	}
	
	Adapter.prototype.getTerremotosMapa = function(){
		webSql.getXTerremotos(20,mostrarTerremotoMapa);
	}
	
	var getTerremotoDBById = function(id,mag){
		webSql.getTerremotoById([id,mag],mostrarTerremoto);
	}
	
	var pushTerremotosDB = function(terremotoWeb,mag){
		terremotosDB.push(terremotoWeb);
		getTerremotoDBById(terremotoWeb.id,mag);
	}
	
	var insertarTerremotos = function(mag){
		//var len = terremotosWeb.length;
		var len = 100;
		for (var i =0; i<len; i++){
			var element = terremotosWeb.shift();
			console.log(element);
			terremoto = {
				'id': element.id,
				'mag':element.properties.mag,
				'place': element.properties.place,
				'time':element.properties.time,
				'location':element.geometry.coordinates[0] + "," + element.geometry.coordinates[1],
				'depth':element.geometry.coordinates[2]
			}
			webSql.addTerremoto(terremoto);
			pushTerremotosDB(element,mag);
		};
	}
	
	var eliminarTerremotos = function(){
		var terremotos = $$("#terremotos>li");
		for(var i=1;i<terremotos.length;i++){
			terremotos[i].remove();
		}
		
	}
	
	Adapter.prototype.getTerremotoDBByPattern = function(pattern){
		eliminarTerremotos();
		webSql.getTerremotoByPattern(pattern,mostrarTerremoto);
	}
	
	return Adapter;
	
})();
