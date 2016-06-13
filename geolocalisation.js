window.addEventListener("load", function() {
	if (navigator.geolocation)
	{
		navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
	}
	else
	{
		alert("Votre navigateur ne prend pas en compte la géolocalisation HTML5");
	}

	function successCallback(position){
		map = new google.maps.Map(document.getElementById("map_canvas"), {
			zoom: 17,
			center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
			mepTypeId: google.maps.MapTypeId.ROADMAP
		});
		console.log("Latitude : " + position.coords.latitude + ", longitude : " + position.coords.longitude);
	};

	function errorCallback(error){
		switch(error.code){
			case error.PERMISSION_DENIED:
			map = new google.maps.Map(document.getElementById("map_canvas"), {
			zoom: 20,
			center: new google.maps.LatLng(48.858565, 2.347198),
			mepTypeId: google.maps.MapTypeId.ROADMAP
		});
			alert("L'utilisateur n'a pas autorisé l'accès à sa position");
			break;          
			case error.POSITION_UNAVAILABLE:
			map = new google.maps.Map(document.getElementById("map_canvas"), {
			zoom: 20,
			center: new google.maps.LatLng(48.858565, 2.347198),
			mepTypeId: google.maps.MapTypeId.ROADMAP
		});
			alert("L'emplacement de l'utilisateur n'a pas pu être déterminé");
			break;
			case error.TIMEOUT:
			map = new google.maps.Map(document.getElementById("map_canvas"), {
			zoom: 20,
			center: new google.maps.LatLng(48.858565, 2.347198),
			mepTypeId: google.maps.MapTypeId.ROADMAP
		});
			alert("Le service n'a pas répondu à temps");
			break;
		}
	};
});