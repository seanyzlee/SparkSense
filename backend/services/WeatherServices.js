const { fetchWeatherApi } = require('openmeteo');
const weatherInfosSingleton = require('../model/weatherInfoSingleton');


const scan = async (latitude, longitude) => {
    const params = {
        "latitude": latitude,
        "longitude": longitude,
        "hourly": ["temperature_2m", "relative_humidity_2m", "precipitation_probability", "precipitation", "cloud_cover", "visibility", "wind_speed_120m", "wind_direction_120m", "temperature_120m", "soil_temperature_18cm", "soil_moisture_3_to_9cm"],
        "forecast_days": 3,
    };
    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);

    // Helper function to form time ranges
    const range = (start, stop, step) =>
        Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

    // Process first location. Add a for-loop for multiple locations or weather models
    const response = responses[0];

    // Attributes for timezone and location
    const utcOffsetSeconds = response.utcOffsetSeconds();
    const timezone = response.timezone();
    const timezoneAbbreviation = response.timezoneAbbreviation();
    latitude = response.latitude();
    longitude = response.longitude();

    const hourly = response.hourly();

    // Note: The order of weather variables in the URL query and the indices below need to match!
    const weatherData = {
        city: latitude + ", " + longitude,
        hourly: {
            time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
                (t) => new Date((t + utcOffsetSeconds) * 1000)
            ),
            temperature2m: hourly.variables(0).valuesArray(),
            relativeHumidity2m: hourly.variables(1).valuesArray(),
            precipitationProbability: hourly.variables(2).valuesArray(),
            precipitation: hourly.variables(3).valuesArray(),
            cloudCover: hourly.variables(4).valuesArray(),
            visibility: hourly.variables(5).valuesArray(),
            windSpeed120m: hourly.variables(6).valuesArray(),
            windDirection120m: hourly.variables(7).valuesArray(),
            temperature120m: hourly.variables(8).valuesArray(),
            soilTemperature18cm: hourly.variables(9).valuesArray(),
            soilMoisture3To9cm: hourly.variables(10).valuesArray(),
        },

    };

    // `weatherData` now contains a simple structure with arrays for datetime and weather data
    weatherInfosSingleton.addWeatherInfo(weatherData);






}

module.exports = { scan };