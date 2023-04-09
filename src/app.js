import path from "path";
import { fileURLToPath } from "url";
import express from "express";

import bodyParser from "body-parser";

import getLocation from "./services/location.service.js";

import getAutoComplete from "./services/autocomplete.service.js";

/* Getting current directory */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* Express app settings */
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

/* Express routes */
app.get("/", (req, res) => {
  res.render("index.ejs", { location: "" });
});

app.post("/", (req, res) => {
  let location = req.body.location;

  // Make sure a valid input is given
  if (!location) return;

  console.log(location);

  // Call to API to retrieve available world locations
  getAutoComplete(location).then(response => {

    let responseArray = [];

    response.features.forEach(feature => {

      // Make sure a valid city is returned 
      if (!feature.properties.city) return;

      // Create response data
      let responseData = {
        city: feature.properties.city,
        state: feature.properties.state_code,
        country: feature.properties.country,
        lon: feature.properties.lon,
        lat: feature.properties.lat
      };

      // Add data to array
      responseArray.push(responseData);
    });

    // Return data (success)
    res.status(200).json(responseArray);

  }).catch(err => {
    
    // Send error info (fail)
    res.status(err.status).json(err);
  });
});

/* Start server and listen on provided port */
app.listen(port, () => {
  console.log(`Server started, running on port ${port}`);
});
