$(document).ready(function () {
  // Function to update the places dynamically
  function updatePlaces() {
    // Request API status
    $.get('http://0.0.0.0:5001/api/v1/places_search/', function (data) {
      // Clear existing places
      $('.places').empty();

      // Loop into the result of the request and create an article tag for each place
      data.forEach(function (place) {
        var article = '<article>' +
                        '<div class="title_box">' +
                          '<h2>' + place.name + '</h2>' +
                          '<div class="price_by_night">$' + place.price_by_night + '</div>' +
                        '</div>' +
                        '<div class="information">' +
                          '<div class="max_guest">' + place.max_guest + ' Guest' + (place.max_guest !== 1 ? 's' : '') + '</div>' +
                          '<div class="number_rooms">' + place.number_rooms + ' Bedroom' + (place.number_rooms !== 1 ? 's' : '') + '</div>' +
                          '<div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : '') + '</div>' +
                        '</div>' +
                        '<div class="user">' +
                          '<b>Owner:</b> ' + place.user.first_name + ' ' + place.user.last_name +
                        '</div>' +
                        '<div class="description">' +
                          place.description +
                        '</div>' +
                      '</article>';
        $('.places').append(article);
      });
    });
  }

  // Initial update when the page loads
  updatePlaces();

  // Listen for changes on each input checkbox tag
  $('input[type="checkbox"]').change(function () {
    // Update the h4 tag inside the div Locations with the list of States or Cities checked
    var locations = [];
    $('input[type="checkbox"]:checked').each(function () {
      locations.push($(this).data('name'));
    });
    $('.locations h4').text(locations.join(', '));
  });

  // When the button tag is clicked
  $('#search-btn').click(function () {
    // Make a new POST request to places_search with the list of Amenities, Cities, and States checked
    var amenities = $('input[data-name^="Amenity"]:checked').map(function () {
      return $(this).data('id');
    }).get();

    var cities = $('input[data-name^="City"]:checked').map(function () {
      return $(this).data('id');
    }).get();

    var states = $('input[data-name^="State"]:checked').map(function () {
      return $(this).data('id');
    }).get();

    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/100-hbnb/api/v1/places_search',
      contentType: 'application/json',
      data: JSON.stringify({
        amenities: amenities,
        cities: cities,
        states: states
      }),
      success: function () {
        // Update the places dynamically after the POST request
        updatePlaces();
      }
    });
  });
});
