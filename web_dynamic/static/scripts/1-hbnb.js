$(document).ready(function () {
  let amenityList = [];

  // Listen for changes on each input checkbox tag
  $('input[type="checkbox"]').change(function () {
    let amenityId = $(this).data('id');
    let amenityName = $(this).data('name');

    if ($(this).is(':checked')) {
      // If the checkbox is checked, store the Amenity ID
      amenityList.push(amenityId);
    } else {
      // If the checkbox is unchecked, remove the Amenity ID
      amenityList = amenityList.filter(id => id !== amenityId);
    }

    // Update the h4 tag inside the div Amenities with the list of Amenities checked
    $('#Amenities h4').text('Selected Amenities: ' + amenityList.join(', '));
  });
});
