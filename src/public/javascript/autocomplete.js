$(function () {
  let timer;
  const timerWaitTime = 500;

  // Auto call API for autocomplete information after a user is done typing
  $("#location").on("keyup", function () {
    // Reset canAutocomplete
    if (!canAutocomplete) canAutocomplete = true;

    // Reset timer if a user keeps typing
    clearTimeout(timer);

    // Start the timeout
    timer = setTimeout(() => {
      // Check if they haven't already clicked a datalist option
      if (canAutocomplete) {
        // If the user does stop typing, trigger a submit
        $("#location-finder").trigger("submit");
      }
    }, timerWaitTime);
  });

  // Call API on form submit
  $("#location-finder").on("submit", function (e) {
    e.preventDefault();

    // Location typed by the user in the form input
    let location = $("#location").val();

    // Post request
    $.ajax({
      url: "/autocomplete",
      type: "POST",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify({ location: location }),
      success: function (data) {
        // Reset datalist options
        $("#available-locations").empty();

        // Add in new datalist options
        data.forEach((location) => {
          $("#available-locations").append(
            $("<option>").attr({
              value: `${location.city}, ${location.state}, ${location.country}`,
              lon: location.lon,
              lat: location.lat,
            })
          );
        });
      },
    });
  });
});
