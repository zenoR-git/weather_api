# weather_api
A weather api in express.js using open-meteo apis
<br>
<br>
### API

* **Endpoint** `POST`
  
  /getWeather
  
* **Body** `json`
  
  ```
  {"cities": [array of names of cities]}
  ```
  
* **Example**
   ```json
    {"cities":["delhi"]}
   ```

* **Result**
   ```json
   {
    "weather": {
     "delhi": 30.6
     }
   }
   ```

<hr>

## NOTES:
* This API return only temperature of the cities passed to it.
* The temperature is in celcius.
* This API is for educational and learning purpose only. It is not for any commercial use.
