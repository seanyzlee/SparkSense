class WeatherInfos {
    constructor() {
        if (!WeatherInfos.instance) {
            this.weatherInfos = [];
            WeatherInfos.instance = this;
        }

        return WeatherInfos.instance;
    }

    getWeatherInfos() {
        return this.weatherInfos;
    }

    addWeatherInfo(info) {
        this.weatherInfos.push(info);
    }

    resetWeatherInfos() {
        this.weatherInfos = [];
    }
}

const instance = new WeatherInfos();

module.exports = instance;