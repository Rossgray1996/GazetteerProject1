// world map

let map = L.map('map').setView([51.505, -0.09], 13);

	let tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 19,
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	}).addTo(map);

	let marker = L.marker([51.5, -0.09]).addTo(map);

	let circle = L.circle([51.508, -0.11], {
		color: 'red',
		fillColor: '#f03',
		fillOpacity: 0.5,
		radius: 500
	}).addTo(map);

	let polygon = L.polygon([
		[51.509, -0.08],
		[51.503, -0.06],
		[51.51, -0.047]
	]).addTo(map);


// country name for selection list
 
$.ajax({
    url: "php/countries.php",
    type: "GET",
    dataType: "json",
    success: function (result) {
        const data = result.data;
       
        // sort out country names alphabetically
        if (result.status.name == "ok") {
          let isosSorted = Object.keys(data).sort(function(a,b){return data[a].localeCompare(data[b])});
            for (let iso of isosSorted) {
               $("#countrySelect").append(
                    '<option value="' +
                    iso +
                    '"> ' +
                    data[iso] +
                    "</option>"
                );
            }

        }
    },
    error: function (errorThrown) {
        console.log(errorThrown);
    },
});




// borders

let borderLayer;
$("#countrySelect").on("change", function () {
  if (borderLayer !== undefined && borderLayer !== null) {
    borderLayer.remove();
  }

  // gets borders for given countries and gives a black border
  
  $.ajax({
    url: "php/borders.php",
    type: "GET",
    dataType: "json",
    data: { country: $("#countrySelect").val() },
    success: function (result) {
      const data = result.data;
      if (result.status.name == "ok") {
        
        borderLayer = L.geoJSON(data, {
          color: "black",
          weight: 2,
        }).addTo(map);

        map.fitBounds(borderLayer.getBounds());
    
      }
    },
    error: function (errorThrown) {
      console.log(errorThrown);
    },
  });
});


function success(pos) {


  const crd = pos.coords;

  $.ajax({
    url: `php/countryCode.php?lat=${crd.latitude}&lng=${crd.longitude}`,
    type: "GET",
    dataType: "json",
    success: function (result) {
      console.log(result);
      $('#countrySelect').val(result['data'].trim());
      $('#countrySelect').trigger('change'); 
    },
    error: function (errorThrown) {
        console.log(errorThrown);
    },
});

 



  console.log('Your current position is:');

  console.log(`Latitude : ${crd.latitude}`);

  console.log(`Longitude: ${crd.longitude}`);

  console.log(`More or less ${crd.accuracy} meters.`);

}



function error(err) {

  console.warn(`ERROR(${err.code}): ${err.message}`);

}



navigator.geolocation.getCurrentPosition(success, error);
  

