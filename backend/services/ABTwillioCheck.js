require('dotenv').config();
const axios = require('axios');


const ABTwillioCheck = async () => {
    let GET_URI = `http://localhost:5050/ab`; 
    try {
        const response = await axios.get(GET_URI);
        const weatherData = response.data;
        const data = weatherData[weatherData.length - 1];
        console.log(data.AIText)
        if (data.AIText.includes("True")) {

        const accountSid = process.env.ACCOUNT_SID
        const authToken = process.env.AUTH_TOKEN
        const client = require('twilio')(accountSid, authToken);
        client.messages
            .create({
                body: `There is a fire happening at ${data.city}. Please take caution.`,
                from: '+12085671065',
                to: process.env.TWILIO_PHONE_NUMBER
            })
            .then(message => console.log(message.sid));

        }
        else {
            console.log("No fire detected");
        }

    }
    catch (error) {
        console.error(error);
    }

}  

module.exports = { ABTwillioCheck };