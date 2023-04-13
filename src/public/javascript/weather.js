let canAutocomplete = true;

$(function () {
  $("#location").on("input", function () {
    let chosenLocation = this.value;

    $("#available-locations option").each(function () {
      if (this.value.toUpperCase() === chosenLocation.toUpperCase()) {

        canAutocomplete = false;
        
        let lon = $(this).attr("lon");
        let lat = $(this).attr("lat");

        $.ajax({
          url: "/getweather",
          type: "POST",
          dataType: "json",
          contentType: "application/json",
          data: JSON.stringify({ lon: lon, lat: lat }),
          success: function (data) {
            console.log(data);
          },
        });
      }
    });
  });
});
