const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const ONWeatherInfo = require('./controllers/ONWeatherInfo');
const ABWeatherInfo = require('./controllers/ABWeatherInfo');
const { PostONInfo } = require('./services/ONWeatherPost')
const { PostABInfo } = require('./services/ABWeatherPost')

// importing twilio
const twilio = require('twilio');

connectDB();
const PORT = process.env.PORT || 5050;
const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

async function runScheduledTasks() {
    await PostONInfo();
    await PostABInfo();
};

runScheduledTasks();

const THREE_MINUTES = 10 * 60 * 1000;
setInterval(runScheduledTasks, THREE_MINUTES);

app.use("/", require('./routes/ONWeatherRoute'));
app.use("/", require('./routes/ABWeatherRoute'));

let server;
if (process.env.PORT) {
    server = app.listen(PORT, () =>
        console.log(`Server Connected to port ${PORT}`)
    );
}

// Handling Error
process.on("unhandledRejection", err => {
    console.log(`An error occurred: ${err.message}`);
    if (server) {
        server.close(() => process.exit(1));
    } else {
        process.exit(1);
    }
});


// Testing out Twilio
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.messages
    .create({
        body: 'Warning! There is a wildfire happening in Waterloo, ON.',
        from: '+12085671065',
        to: '+16475629003'
    })
    .then(message => console.log(message.sid))
    .catch(error => console.error(error));

