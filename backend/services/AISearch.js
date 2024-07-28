require('dotenv').config();
const axios = require('axios');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const WeatherInquire = async (province) => {
    let GET_URI = `http://localhost:5050/` + province; // This is the URI to get the weather data from the backend
    const response = await axios.get(GET_URI);
    const genAI = new GoogleGenerativeAI(process.env.GEM_API_KEY);
    const weatherData = response.data;

    try {
        console.log("Prompting AI...");

        let data = weatherData[weatherData.length - 1];
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = `Provide a % chance of wildfire happening in the area based on the weather data just based on the data given below here. No need to provide any other information other than the chance of natural disaster and wildfire happening in the area at the present. This is based on temperatures, Precipitation Probabilities, Wind Speeds, Soil Moistures, and Soil Temperatures, Humidity, Cloud Covers alone. :
        
        This is data that is based on the weather data in the area in the 3 days. With each delimited by a comma being an hour of data until the next day starts for 2 days.
        With that in mind, here is the data and pleae answer the question with the template of 'The chance of wildfire happening in the area is %' with the % being the chance of wildfire happening in the area.' with a brief reason why you think that is the case.: 

        City: ${data.city}, 
        Times: ${data.time}, 
        Humidities (in % form out of 100): ${data.humidity},
        Temperature in 20 meters from each sides (celcius): ${data.temperature},
        Precipitation Probabilities (in decimal form out of 100): ${data.precipitationProbability}, 
        Precipitations (in decimal form out of 0.1): ${data.precipitation}, 
        Cloud Covers (in decimal form out of 100): ${data.cloudCover}, 
        Visibilities (in meters): ${data.visibility}, 
        Wind Speeds (km/h): ${data.windSpeed}, 
        Wind Directions (degrees): ${data.windDirection}, 
        Temperatures in 120 meters from each sides (celcius): ${data.temperature120m}, 
        Soil Temperatures (celcius): ${data.soilTemperature}, 
        Soil Moistures (out of max 1 m^3/m^3): ${data.soilMoisture}`

        console.log("Generating content...");
        const result = await model.generateContent(prompt);
        console.log("Content generated successfully!");
        const response = await result.response;
        const text = response.text();

        return text;

    } catch (error) {
        console.log("Error in ReadAIPrompt");
        console.log(error);
    }
}


module.exports = { WeatherInquire };

