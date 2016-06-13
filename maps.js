	/*INITIALISATION DE LA MAP ET SES DIFFERENTS PARAMETRES*/

	var previousPosition = null;
	var panel = document.getElementById("panel");
	var startofpath = document.getElementById("start");
	var endofpath = document.getElementById("end");
	var map;
	var infoWindow;
	var service;
	var completion = new google.maps.places.Autocomplete(startofpath);
	var complete = new google.maps.places.Autocomplete(endofpath);

	function initialize() {
		// console.log("dans initialize");
		map = new google.maps.Map(document.getElementById("map_canvas"), {
			zoom: 17,
			center: new google.maps.LatLng(48.858565, 2.347198),
			mapTypeId: google.maps.MapTypeId.TERRAIN,
			backgroundColor: "none"
		});
		infoWindow = new google.maps.InfoWindow();
		service = new google.maps.places.PlacesService(map);
		var activities = document.getElementById("activities");
		activities.addEventListener('click', function performSearch(){
			var whatfound = document.getElementById("whatfound").value;
			var kilometers = document.getElementById("kilometers").value;
			var request = {
				bounds: map.getBounds(),
				location: origin,
				radius: kilometers,
				keyword: whatfound
			};
			// console.log("dans un périmètre de : " + kilometers + "m" + "autour de : " + origin);
			// console.log("Ce que je veux :" + whatfound);
			service.radarSearch(request, callback);
		});

		direction = new google.maps.DirectionsRenderer({
			map: map,
			panel: panel
		})
	}
	if(previousPosition){
		// console.log("dans le if previousposition");
		var newLineCoordinates = [
		new google.maps.LatLng(previousPosition.coords.latitude, previousPosition.coords.longitude),
		new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
		];
		var newLine = new google.maps.Polyline ({
			path: newLineCoordinates,
			strokeColor: "#000",
			stokeOpacity: 0.1,
			stokeWeight: 1
		});
		newLine.setMap(map);
	}
/*	function performSearch() {
		var request = {
			bounds: map.getBounds(),
			keyword: 'monument'
		};
		service.radarSearch(request, callback);
	}*/
	function callback(results, status) {
		if (status !== google.maps.places.PlacesServiceStatus.OK) {
			console.error(status);
			return;
		}
		for(var i = 0, result; result = results[i]; i++) {
			addMarker(result);
		}
	}

	function addMarker(place) {
		var marker = new google.maps.Marker({
			map: map,
			position: place.geometry.location,
			icon: {
				url: 'http://maps.gstatic.com/mapfiles/circle.png',
				anchor: new google.maps.Point(10, 10),
				scaledSize: new google.maps.Size(10, 17)
			}
		});

		google.maps.event.addListener(marker, 'click', function() {
			service.getDetails(place, function(result, status) {
				if(status !== google.maps.places.PlacesServiceStatus.OK) {
					console.error(status);
					return;
				}
				infoWindow.setContent(result.name);
				infoWindow.open(map, marker);
			});
		});
	 } 

	/*CALCUL DE L'ITINERAIRE*/

	var panel;
	var base;
	var calculate;
	var direction;
	var road = document.getElementById("road");
		road.addEventListener("click", function() {
// console.log("dans l'event"); // Création de la fonction permettant de faire le calcul de l'ininéraire
	origin = document.getElementById("start").value; // Ici, la variable qui défini le point de départ
	destination = document.getElementById("end").value; // La variabe qui défini le point d'arrivé
	if(origin && destination) // Si le point de départ et le point d'arrivé existent (les variables correspondent au nom de l'id du formulaire pour mieux s'y retrouver)
	{
		var styleofrun = document.getElementById("styleofrun").value;
		// console.log("origin et destination existent");
		var request = { // On crée la variable qui va effectuer la requête
			origin: origin,
			destination: destination,
			travelMode: styleofrun
		}
	// console.log(styleofrun);
			// console.log(origin) // Le mode de transport qu'on va utiliser, ici, la voiture
		var directionsService = new google.maps.DirectionsService(); // La fonction correspond au service du calcul de l'itinéraire
		directionsService.route(request, function(answer, statut) { // On envoie la requête pour calculer le parcours
			if(statut == google.maps.DirectionsStatus.OK){ // Si le parcours est correct
				direction.setDirections(answer); // L'itinéraire se trace sur la map ainsi que les diffrentes étapes du parcours
				// console.log(answer);
			}
		});
	}
});


/*CHANGEMENTS DE STYLE DE LA PAGE*/


var full = document.getElementById("fullscreen");
var canvas = document.getElementById("map_canvas");
full.addEventListener("click", function() {
	canvas.mozRequestFullScreen();
	full.style.display = "none";
	reduce.style.display = "initial";
	moins.style.display = "initial";
	plus.style.display = "initial";
});
var reduce = document.getElementById("reduce");
var moins = document.getElementById("moins");
var plus = document.getElementById("plus");
reduce.addEventListener("click", function () {
	canvas.style.width = "800px";
	canvas.style.height = "600px";
	full.style.display = "initial";
	reduce.style.displlay = "none";
});
moins.addEventListener("click", function () {
	var haut = document.getElementById("map_canvas").offsetHeight;
	var larg =document.getElementById("map_canvas").offsetWidth;
	// console.log(haut);
	canvas.style.width = larg+"200";
	// console.log(larg);
	canvas.style.height = haut+"100";
});