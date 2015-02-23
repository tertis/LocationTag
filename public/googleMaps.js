/**
 * Created by tertis on 15. 2. 14..
 */
var map;
function initialize() {
    var mapOptions = {
        //zoom: 12,
        // 일단 서울 위치
        //center: new google.maps.LatLng(37.5, 127),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    // google map 초기화
    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

    //createControl();
    createSearchBox();
}

function createControl() {
    // Create a div to hold the control.
    var controlDiv = document.createElement('div');

// Set CSS styles for the DIV containing the control
// Setting padding to 5 px will offset the control
// from the edge of the map.
    controlDiv.style.padding = '5px';
    controlDiv.index = 1;

// Set CSS for the control border.
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = 'white';
    controlUI.style.borderStyle = 'solid';
    controlUI.style.borderWidth = '2px';
    controlUI.style.cursor = 'pointer';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Click to set the map to Home';
    controlDiv.appendChild(controlUI);

// Set CSS for the control interior.
    var controlInput = document.createElement('input');
    controlInput.id = 'search';
    controlUI.appendChild(controlInput);
    var controlText = document.createElement('div');
    controlText.style.fontFamily = 'Arial,sans-serif';
    controlText.style.fontSize = '12px';
    controlText.style.paddingLeft = '4px';
    controlText.style.paddingRight = '4px';
    controlText.innerHTML = '<strong>Home</strong>';
    controlUI.appendChild(controlText);

    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(controlDiv);
};

function createSimpleMarker() {
    // simple marker 예제
    var myLatlng = new google.maps.LatLng(37.5, 127);
    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: 'Hello World!'
    });
};

function createSearchBox() {
    // search box sample
    var markers = [];
    var defaultBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(-33.8902, 151.1759),
        new google.maps.LatLng(-33.8474, 151.2631));
    map.fitBounds(defaultBounds);

    // Create the search box and link it to the UI element.
    var input = /** @type {HTMLInputElement} */(
        document.getElementById('pac-input'));
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    var searchBox = new google.maps.places.SearchBox(
        /** @type {HTMLInputElement} */(input));

    // Listen for the event fired when the user selects an item from the
    // pick list. Retrieve the matching places for that item.
    google.maps.event.addListener(searchBox, 'places_changed', function() {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }
        for (var i = 0, marker; marker = markers[i]; i++) {
            marker.setMap(null);
        }

        // For each place, get the icon, place name, and location.
        markers = [];
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0, place; place = places[i]; i++) {
            // 마커 이미지 생성
            var image = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            var marker = new google.maps.Marker({
                map: map,
                icon: image,
                title: place.name,
                position: place.geometry.location
            });

            markers.push(marker);

            bounds.extend(place.geometry.location);
        }

        map.fitBounds(bounds);
        map.setZoom(15);
    });

    // Bias the SearchBox results towards places that are within the bounds of the
    // current map's viewport.
    google.maps.event.addListener(map, 'bounds_changed', function() {
        var bounds = map.getBounds();
        searchBox.setBounds(bounds);
    });
};

google.maps.event.addDomListener(window, 'load', initialize);