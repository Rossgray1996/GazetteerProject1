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
 
let countryNames;


$.ajax({
    url: "php/countries.php",
    type: "GET",
    dataType: "json",
    success: function (result) {
      countryNames = result.data;
       
        // sort out country names alphabetically
        if (result.status.name == "ok") {
          let isosSorted = Object.keys(countryNames).sort(function(a,b){return countryNames[a].localeCompare(countryNames[b])});
            for (let iso of isosSorted) {
               $("#countrySelect").append(
                    '<option value="' +
                    iso +
                    '"> ' +
                    countryNames[iso] +
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

let currencyCode;
let countryName;


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
      
      let countryCode = $("#countrySelect").val();
    countryName = countryNames[countryCode];
   
      $.ajax({
        url: `php/countryInfo.php?country=${countryCode}`,
        type: "GET",
        dataType: "json",
        success: function (result) {
          $( ".Population" ).text(result["data"][0]["population" ])
          currencyCode = result["data"][0]["currencyCode" ]
          $( ".Currency" ).text(result["data"][0]["currencyCode" ])
          $( ".Capital" ).text(result["data"][0]["capital" ])
          
          console.log(result);
        },
        error: function (errorThrown) {
            console.log(errorThrown);
        },
      });
     









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

// modal window button js code for Population, Currency & Capital

$("#populationButton").on("click", function () {
let countryCode = $("#countrySelect").val();
$.ajax({
  url: `php/countryInfo.php?country=${countryCode}`,
  type: "GET",
  dataType: "json",
  success: function (result) {
    $( ".Population" ).text(result["data"][0]["population" ])
    $( ".Currency" ).text(result["data"][0]["currencyCode" ])
    $( ".Capital" ).text(result["data"][0]["capital" ])
    
    console.log(result);
  },
  error: function (errorThrown) {
      console.log(errorThrown);
  },
});
})

// modal window button js code for Exchange Rate

$("#exchangeRateButton").on("click", function () {
  let exchangeRate = $("#countrySelect").val();
  $.ajax({
    url: `php/exchangeRate.php?currencyCode=${currencyCode}`,
    type: "GET",
    dataType: "json",
    success: function (result) {
      $( ".exchangeRate" ).text(result["data"])
     
      
      console.log(result);
    },
    error: function (errorThrown) {
        console.log(errorThrown);
    },
  });
  })

// modal window button js code for Weather

  $("#weatherButton").on("click", function () {
    let currentWeather = $("#countrySelect").val();
    $.ajax({
      url: `php/weather.php?countryName=${countryName}`,
      type: "GET",
      dataType: "json",
      success: function (result) {
        $( ".currentWeather").text(result["data"]["weather"][0]["description"]) 
        $( ".temperature" ).text(result["data"]["main"]["temp"]) 
        $( ".windSpeed" ).text(result["data"]["wind"]["speed"]) 
        
        console.log(result);
      },
      error: function (errorThrown) {
          console.log(errorThrown);
      },
    });
    })
