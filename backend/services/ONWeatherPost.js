const axios = require('axios');
const singleton = require("../model/weatherInfoSingleton");

const PostONInfo = async () => {
    let GET_URI = `http://localhost:5050/on/post`; // This is the URI to get the weather data from the backend
    try {
        const response = await axios.post(GET_URI);
        console.log("ON Weather data posted successfully!");

    }
    catch (error) {
        console.error(error);
    }

}

module.exports = { PostONInfo };