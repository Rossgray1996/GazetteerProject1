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







// GET COUNTRY NAME FOR SELECTION LIST 
$.ajax({
    url: "php/countries.php",
    type: "GET",
    dataType: "json",
    success: function (result) {
        const data = result.data;
        if (result.status.name == "ok") {
            let countries = countrySort(data);
            for (let iso in data) {
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

// SORT OUT COUNTRY NAMES ALPHABETICALLY & ALIGN WITH ISO CODES

function countrySort(country) {
    let sortedList = [];
    let sortedNames = [];
    for (i = 0; i < country.length; i++) {
        sortedNames.push(country[i].name);
    }
    sortedNames.sort();
    for (i = 0; i < sortedNames.length; i++) {
        for (j = 0; j < country.length; j++) {
            if (sortedNames[i] === country[j].name) {
                sortedList.push(country[j]);
            }
        }
    }
    return sortedList;
}