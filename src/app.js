import getLocation from "./services/location.service.js";
import {
  getWeatherByCity,
  getWeatherByLL,
} from "./services/weather.service.js";

getLocation().then((res) => {
  //   getWeatherByLL(res["latitude"], res["longitude"]).then((weather) => {
  //     console.log(weather);
  //   });
  //   getWeatherByCity(res["city"]).then(weather => {
  //     console.log(weather);
  //   });
});
