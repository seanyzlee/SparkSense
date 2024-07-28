const mongoose = require('mongoose');

const WeatherInfoSchema = new mongoose.Schema({
    city: { type: String, required: false },
    time: { type: [Date], required: true },
    temperature: { type: [Number], required: true },
    humidity: { type: [Number], required: true },
    precipitationProbability: { type: [Number], required: true },
    precipitation: { type: [Number], required: true },
    cloudCover: { type: [Number], required: true },
    visibility: { type: [Number], required: true },
    windSpeed: { type: [Number], required: true },
    windDirection: { type: [Number], required: true },
    temperature120m: { type: [Number], required: true },
    soilTemperature: { type: [Number], required: true },
    soilMoisture: { type: [Number], required: true },
    AIText: { type: String, required: true },
});

module.exports.WeatherInfoSchema = WeatherInfoSchema;