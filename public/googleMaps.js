/**
 * Created by tertis on 15. 2. 14..
 */
var map;
var addDataMarker = null;
var infoWindow = null;
var addContentElement = null;

var activeAddMarker = {};

function clearChildren(element) {
    for (var i = 0; i < element.childNodes.length; i++) {
        var e = element.childNodes[i];
        if (e.tagName) switch (e.tagName.toLowerCase()) {
            case 'input':
                switch (e.type) {
                    case "radio":
                    case "checkbox": e.checked = false; break;
                    case "button":
                    case "submit":
                    case "image": break;
                    default: e.value = ''; break;
                }
                break;
            case 'select': e.selectedIndex = 0; break;
            case 'textarea': e.innerHTML = ''; break;
            default: clearChildren(e);
        }
    }
}

function initialize() {
    // Position initialize
    var mapOptions = {
        zoom: 12,
        // Seoul
        center: new google.maps.LatLng(37.5, 127),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    // Initialize Google maps api
    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

    google.maps.event.addListener(map, 'click', function (event) {
        addMarker(event.latLng);
    });

    InitializeInfoWindow();
    CreateSearchBox('pac-input');
    testTagMarker();
}

function InitializeInfoWindow() {
    addContentElement = document.getElementById('add-input');
    addContentElement.style.visibility = "hidden";
    infoWindow = new google.maps.InfoWindow({
        content: null
    });
}


function addMarker(location) {
    if (addDataMarker !== null) addDataMarker.setMap(null);
    clearChildren(addContentElement);
    addContentElement.style.visibility = "visible";
    infoWindow.setContent(addContentElement);
    addDataMarker = new google.maps.Marker({
        position: location,
        map: map
    });
    infoWindow.open(map,addDataMarker);
}

function CreateSearchBox(inputElement) {
    var markers = [];
    var input = /** @type {HTMLInputElement} */(
        document.getElementById(inputElement));
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
}

function makeTagMarker(markerData)
{
    var markerInfoWindow = new google.maps.InfoWindow({
        content: '<p><b>' + markerData.name + '</b></p>' + markerData.tag
    });

    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(markerData.locationN, markerData.locationE),
        map: map,
        title: markerData.name
    });

    google.maps.event.addListener(marker, 'click', function() {
        markerInfoWindow.open(map,marker);
    });
}

// add 관련 처리
var locationTag = angular.module('locationTag', []);

locationTag.controller('addController', function($scope,$http) {
    $scope.addTagMarker = function () {
        activeAddMarker.locationN = addDataMarker.position.lat();
        activeAddMarker.locationE = addDataMarker.position.lng();
        activeAddMarker.title = document.getElementById('add-title').value;
        activeAddMarker.description = document.getElementById('add-description').value;
        activeAddMarker.tags = document.getElementById('add-tags').value;
        $http.get('/add', {params: activeAddMarker})
            .success(function (data) {
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });

    };
});

google.maps.event.addDomListener(window, 'load', initialize);