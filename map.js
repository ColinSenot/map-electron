var URL = 'http://localhost:8080';

function computeCenter(markers) {
  var latitude = 0;
  var longitude = 0;

  for (var i = 0; i < markers.length; i++) {
    var marker = markers[i];

    latitude += marker.latitude;
    longitude += marker.longitude;
  }

  latitude /= markers.length;
  longitude /= markers.length;

  return {lat: latitude, lng: longitude};
}

function initMap() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      _initMap(JSON.parse(xhttp.responseText));
    }
  };
  xhttp.open('GET', URL + '/markers');
  xhttp.send();
}

function _initMap(markers) {
  var cntr = computeCenter(markers);

  var _map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: cntr
  });

  for (var i = 0; i < markers.length; i++) {
    var marker = markers[i];

    new google.maps.Marker({
      position: {lat: marker.latitude, lng: marker.longitude},
      map: _map,
      title: marker.id.toString()
    });
  }
}
