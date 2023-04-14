import getAutocomplete from "../services/autocomplete.service.js";

let availableLocations = [];

export default (req, res) => {
  // Clear any existing locations in array
  availableLocations = [];

  // Location typed by user
  let location = req.body.location;

  // Make sure a valid input is given
  if (!location) return;

  // Call to API to retrieve available world locations
  getAutocomplete(location)
    .then((response) => {

      response.features.forEach((feature) => {
        // Make sure a valid city is returned
        if (!feature.properties.city) return;

        // Create response data
        let newLocation = {
          city: feature.properties.city,
          state: feature.properties.state_code,
          country: feature.properties.country,
          lon: feature.properties.lon,
          lat: feature.properties.lat,
        };

        // Check for duplicates before adding to response array
        if (isDuplicateItem(newLocation)) return;

        // Add data to array
        availableLocations.push(newLocation);
      });

      console.log(availableLocations);

      // Return data (success)
      res.status(200).json(availableLocations);
    })
    .catch((err) => {
      // Send error info (fail)
      res.status(err.status).json(err);
    });
};

function isDuplicateItem(data) {
  return availableLocations.find((location) => {
    return (
      location.city === data.city &&
      location.state === data.state &&
      location.country === data.country
    );
  });
}
