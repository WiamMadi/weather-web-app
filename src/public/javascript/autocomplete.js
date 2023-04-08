$(function () {
  // Add a keyup timer to auto run API call
  $("#location").on("keyup", function() {
    setTimeout(() => {
      $("#location-finder").trigger("submit");
    }, 5000);
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
            `<option value="${location.city}, ${location.state}, ${location.country}">`
          );
        });
        //console.log(data);
      },
    });
  });
});