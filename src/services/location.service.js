import "dotenv/config";
import fetch from "node-fetch";
import checkStatus from "../utils/http-response.util.js";

/* GeoIP API URL */
const geoUrl =
  "https://api.ipgeolocation.io/ipgeo?apiKey=" + process.env.GEOIP_API_KEY;

/* Retrivies location information */
export default async function getLocation() {
  return await fetch(geoUrl)
    .then((response) => {
      // Error Handling
      try {
        checkStatus(response);
        return response.text();
      } catch (error) {
        // Console log the error
        console.error(error);

        // Return the error status and the message
        return {
          status: error.status,
          message: error.message,
        };
      }
    })
    .then((text) => {
      // Convert response text to JSON
      return JSON.parse(text);
    });
}
