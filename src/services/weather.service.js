import "dotenv/config";
import fetch from "node-fetch";
import checkStatus from "../utils/http-response.util.js";

/* Weather API URL */
const weatherUrl =
  "https://api.weatherapi.com/v1/current.json?key=" +
  process.env.WEATHER_API_KEY +
  "&q=";

/* Retrivies weather information based on city name */
export async function getWeatherByCity(city) {
  return await fetch(weatherUrl + city)
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

/* Retrivies weather information based on latitude and longitude */
export async function getWeatherByLL(latitude, longitude) {
  return await fetch(weatherUrl + latitude + "," + longitude)
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