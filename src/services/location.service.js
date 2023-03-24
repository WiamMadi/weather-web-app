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
        console.error(error);
      }
    })
    .then((text) => {
      return JSON.parse(text);
    });
}
