document.addEventListener('DOMContentLoaded', function () {
  // ... (Previous code)

  // New event listener for the Reviews span toggle
  $('.reviews-toggle').click(function () {
    var reviewsSection = $('.reviews');

    // If the text is 'show', fetch, parse, display reviews and change the text to 'hide'
    if ($(this).text() === 'show') {
      $.ajax({
        type: 'GET',
        url: 'http://0.0.0.0:5000/api/v1/places/101-hbnb/reviews',
        contentType: 'application/json',
        success: function (data) {
          // Display reviews
          var reviews = data.map(function (review) {
            return '<p>' + review.text + '</p>';
          });
          reviewsSection.html(reviews.join(''));

          // Change the text to 'hide'
          $('.reviews-toggle').text('hide');
        }
      });
    } else {
      // If the text is 'hide', remove all Review elements from the DOM
      reviewsSection.empty();
      // Change the text to 'show'
      $('.reviews-toggle').text('show');
    }
  });
});
