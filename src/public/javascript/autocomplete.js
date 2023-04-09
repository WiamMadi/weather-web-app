let timer;
const waitTime = 500;

$(function () {
  // Add a keyup timer to auto run API call
  $("#location").on("keyup", function () {
    // Reset timer if a user keeps typing
    clearTimeout(timer);

    // Start the timeout
    timer = setTimeout(() => {
      // If the user does stop typing, trigger a submit
      $("#location-finder").trigger("submit");
    }, waitTime);
  });

  $("#location").on("input", function () {
    let chosenLocation = this.value;

    $("#available-locations option").each(function () {
      if (this.value.toUpperCase() === chosenLocation.toUpperCase()) {
        console.log($(this).data());
      }
    });
  });

  // Call API
  $("#location-finder").on("submit", function (e) {
    e.preventDefault();

    let value = $("#location").val();

    $.ajax({
      url: "/",
      type: "POST",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify({ location: value }),
      success: function (data) {
        $("#available-locations").empty();

        data.forEach((location) => {
          $("#available-locations").append(
            $("<option>").attr({
              value: `${location.city}, ${location.state}, ${location.country}`,
              lon: location.lon,
              lat: location.lat,
            })
          );
        });
        //console.log(data);
      },
    });
  });
});
