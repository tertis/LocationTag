/**
 * Created by tertis on 15. 2. 14..
 */
var map;
function initialize() {
    var mapOptions = {
        zoom: 8,
        center: new google.maps.LatLng(-34.397, 150.644)
    };

    // google map 초기화
    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

    createControl();
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
    var controlText = document.createElement('div');
    controlText.style.fontFamily = 'Arial,sans-serif';
    controlText.style.fontSize = '12px';
    controlText.style.paddingLeft = '4px';
    controlText.style.paddingRight = '4px';
    controlText.innerHTML = '<strong>Home</strong>';
    controlUI.appendChild(controlText);

    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(controlDiv);
}

google.maps.event.addDomListener(window, 'load', initialize);