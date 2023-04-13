import "dotenv/config";
import fetch from "node-fetch";
import checkStatus from "../utils/http-response.util.js";

/* GeoIP API URL */
const geoapifyUrl = "https://api.geoapify.com/v1/geocode/autocomplete?text=";

/* Retrivies location information */
export default async function getAutocomplete(query) {
  return await fetch(
    geoapifyUrl + query + "&apiKey=" + process.env.GEOAPIFY_API_KEY
  ).then((response) => {
    // Error Handling
    try {
      checkStatus(response);
      return response.text();
    } catch (error) {
      // Console log the error
      console.log(error);
      // Return the error status and the message
      return {
        status: error.status,
        message: error.message
      };
    }
  }).then((text) => {
    // Convert response text to JSON
    return JSON.parse(text);
  });
}