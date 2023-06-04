import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

async function getLocations(city) {
  try {
    var geo_api = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`;
    let results = await axios.get(geo_api);

    if (results.data.results !== undefined) {
      let { latitude, longitude } = results.data.results[0];
      //   console.log(latitude, longitude);
      return { lat: latitude, long: longitude };
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

app.post("/getWeather", async (req, res) => {
  try {
    let { cities } = req.body;
    let result = {};
    for (let i = 0; i < cities.length; i++) {
      let city = cities[i];
      let location = await getLocations(city);
      if (location == false) {
        return res
          .status(400)
          .json({ Error: { message: "error in " + city + " location." } });
      }
      let { lat, long } = location;
      let weather_api = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true`;
      let weather = await axios.get(weather_api);
      result[city] = weather.data.current_weather.temperature;
    }
    res.json({ weather: result });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "error occured while trying to fetch current weather data",
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("listening on");
});
