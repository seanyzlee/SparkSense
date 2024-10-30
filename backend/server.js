const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const { PostONInfo } = require('./services/ONWeatherPost')
const { PostABInfo } = require('./services/ABWeatherPost')
const { ABTwillioCheck } = require('./services/ABTwillioCheck');
const { ONTwillioCheck } = require('./services/ONTwillioCheck');

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
    await ABTwillioCheck();
    await ONTwillioCheck();
    console.log("Scheduled tasks completed!");


};

runScheduledTasks();

const TEN_MINUTES = 10 * 60 * 1000;
setInterval(runScheduledTasks, TEN_MINUTES);

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






