const mongoose = require("mongoose")
const { WeatherInquire } = require("../services/AISearch");
const { WeatherInfoSchema } = require("../model/weatherInfoSchema");
const { scan } = require("../services/WeatherServices");
const singleton = require("../model/weatherInfoSingleton");
const ABWeatherInfo = mongoose.model("ABWeatherInfo", WeatherInfoSchema);

const Create = async (req, res, next) => {
    try {
        const newWeatherInfo = new ABWeatherInfo(req.body);
        const savedWeatherInfo = await newWeatherInfo.save();
        res.status(201).json(savedWeatherInfo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const Read = async (req, res, next) => {
    // Read - GET /on
    try {
        const weatherData = await ABWeatherInfo.find()
        res.status(200).json(weatherData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const ReadAIPrompt = async (req, res, next) => {
    try {
        const AIText = await WeatherInquire("ab");
        res.send(AIText)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


const PostABInfo = async (req, res, next) => {
    try {
        // Clear the singleton array using the reset method
        singleton.resetWeatherInfos();

        // Perform the scan and add to the weatherData array
        await scan(52.8733, 118.0823);

        // Get the updated weather data
        const updatedWeatherData = singleton.getWeatherInfos(); // Only a single weather info object

        let weatherData = [];


        // Convert the weather data to the format that can be saved to the database
        for (let i = 0; i < updatedWeatherData.length; i++) {

            const float32Array1 = new Float32Array(updatedWeatherData[i].hourly.precipitationProbability);
            const float32Array2 = new Float32Array(updatedWeatherData[i].hourly.precipitation);
            const float32Array3 = new Float32Array(updatedWeatherData[i].hourly.cloudCover);
            const float32Array4 = new Float32Array(updatedWeatherData[i].hourly.visibility);
            const float32Array5 = new Float32Array(updatedWeatherData[i].hourly.windSpeed120m);
            const float32Array6 = new Float32Array(updatedWeatherData[i].hourly.temperature120m);
            const float32Array7 = new Float32Array(updatedWeatherData[i].hourly.relativeHumidity2m);
            const float32Array8 = new Float32Array(updatedWeatherData[i].hourly.temperature2m);
            const float64Array1 = new Float64Array(updatedWeatherData[i].hourly.windDirection120m);
            const float64Array2 = new Float64Array(updatedWeatherData[i].hourly.soilTemperature18cm);
            const float64Array3 = new Float64Array(updatedWeatherData[i].hourly.soilMoisture3To9cm);


            const precipitationProbability = Array.from(float32Array1);
            const precipitation = Array.from(float32Array2);
            const cloudCover = Array.from(float32Array3);
            const visibility = Array.from(float32Array4);
            const windSpeed = Array.from(float32Array5);
            const temperature120m = Array.from(float32Array6);
            const windDirection = Array.from(float64Array1);
            const soilTemperature = Array.from(float64Array2);
            const soilMoisture = Array.from(float64Array3);
            const humidity = Array.from(float32Array7);
            const temperature = Array.from(float32Array8);
            const AIText = await WeatherInquire("ab");

            const weatherInfo = {
                city: updatedWeatherData[i].city,
                time: updatedWeatherData[i].hourly.time,
                temperature: temperature,
                humidity: humidity,
                precipitationProbability: precipitationProbability,
                precipitation: precipitation,
                cloudCover: cloudCover,
                visibility: visibility,
                windSpeed: windSpeed,
                windDirection: windDirection,
                temperature120m: temperature120m,
                soilTemperature: soilTemperature,
                soilMoisture: soilMoisture,
                AIText: AIText,
            };
            weatherData.push(weatherInfo);

        }

        // Save the weather data to the database
        const result = await ABWeatherInfo.insertMany(weatherData);

        console.log("Weather data posted successfully!");

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

module.exports = { Create, Read, ReadAIPrompt, PostABInfo };
