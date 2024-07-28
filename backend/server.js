const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const ONWeatherInfo = require('./controllers/ONWeatherInfo');
const ABWeatherInfo = require('./controllers/ABWeatherInfo');
const { PostONInfo } = require('./services/ONWeatherPost')
const { PostABInfo } = require('./services/ABWeatherPost')

connectDB();
const PORT = process.env.PORT || 5050;
const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const runScheduledTasks = () => {
    PostONInfo();
    PostABInfo();
};

runScheduledTasks();

const THREE_MINUTES = 3 * 60 * 1000;
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