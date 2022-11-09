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