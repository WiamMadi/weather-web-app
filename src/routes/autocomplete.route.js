import getAutocomplete from "../services/autocomplete.service.js";

export default (req, res) => {
  // Location typed by user
  let location = req.body.location;

  // Make sure a valid input is given
  if (!location) return;

  // Call to API to retrieve available world locations
  getAutocomplete(location)
    .then((response) => {
      let responseArray = [];

      response.features.forEach((feature) => {
        // Make sure a valid city is returned
        if (!feature.properties.city) return;

        // Create response data
        let responseData = {
          city: feature.properties.city,
          state: feature.properties.state_code,
          country: feature.properties.country,
          lon: feature.properties.lon,
          lat: feature.properties.lat,
        };

        // Add data to array
        responseArray.push(responseData);
      });

      // Return data (success)
      res.status(200).json(responseArray);
    })
    .catch((err) => {
      // Send error info (fail)
      res.status(err.status).json(err);
    });
};
