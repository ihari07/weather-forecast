import React from "react";
import "./weather-tile.css";
const MONTHS = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

class WeatherTile extends React.Component {

    constructor() {
        super();
        this.state = { cityWeatherData: {}, currentTileData: {}, currentDayValue: -1 };
    }

    getDayOfTheWeek = () => {
        if (!this.isEmpty(this.props.cityWeatherData)) {
            const Day = new Date(this.state.cityWeatherData.list[this.props.currentDayValue].dt_txt).toLocaleString('en', { weekday: 'long' })
            return Day;
        }
    }

    getMonthOfTheYear = () => {
        if (!this.isEmpty(this.props.cityWeatherData)) {
            return MONTHS[new Date(this.state.cityWeatherData.list[this.props.currentDayValue].dt_txt).getMonth()];
        }
    }

    getFormattedDay() {
        let currentDateSuffix;
        if (!this.isEmpty(this.props.cityWeatherData)) {
            const currentDate = new Date(this.state.cityWeatherData.list[this.props.currentDayValue].dt_txt).getDate();
            switch (currentDate) {
                case 1:
                case 21:
                case 31:
                    currentDateSuffix = "st";
                    break;
                case 2:
                case 22:
                    currentDateSuffix = "nd";
                    break;
                case 3:
                case 23:
                    currentDateSuffix = "rd";
                    break;
                default:
                    currentDateSuffix = "th";
                    break;
            }
            return currentDateSuffix;
        }
    }

    getDateOfMonth() {
        if (!this.isEmpty(this.props.cityWeatherData)) {
            const currentDate = new Date(this.state.cityWeatherData.list[this.props.currentDayValue].dt_txt);
            return currentDate.getDate();
        }
    }

    getWeatherDesc = () => {
        if (!this.isEmpty(this.props.cityWeatherData)) {
            return this.state.cityWeatherData.list[this.props.currentDayValue].weather[0].description;
        }
    };

    getFormattedTimeAMPM = () => {
        if (!this.isEmpty(this.props.cityWeatherData)) {
            const currentDate = new Date(this.state.cityWeatherData.list[this.props.currentDayValue].dt_txt);
            let hours = currentDate.getHours();
            let minutes = currentDate.getMinutes();
            let ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12;
            minutes = minutes.toString().padStart(2, '0');
            let strTime = hours + ':' + minutes + ' ' + ampm;
            return strTime;
        }
    }

    getProjectTemp = () => {
        if (!this.isEmpty(this.props.cityWeatherData)) {
            const kelivTemp = this.state.cityWeatherData.list[this.props.currentDayValue].main.temp - 273.15;
            return Math.round((kelivTemp + Number.EPSILON) * 100) / 100;
        }
    }

    getWeatherImg = () => {
        if (!this.isEmpty(this.props.cityWeatherData)) {
            const weatherIcon = this.state.cityWeatherData.list[this.props.currentDayValue].weather[0].icon;
            return `http://openweathermap.org/img/w/${weatherIcon}.png`;
        }
    };

    componentDidMount() {
        console.log('componentDidMount child');
        this.updateCitiesData();
    }

    // componentDidUpdate() {
    //     console.log('componentDidUpdate child');
    //     this.updateCitiesData();
    // }

    updateCitiesData = () => {
        if (!this.isEmpty(this.props.cityWeatherData)) {
            this.setState({
                cityWeatherData: this.props.cityWeatherData
            }, () => {
                this.setState({
                    currentTileData: {
                        dayOfWeek: this.getDayOfTheWeek(),
                        formattedDate: this.getMonthOfTheYear() + " " + this.getDateOfMonth() + "" + this.getFormattedDay() + " , " + this.getFormattedTimeAMPM(),
                        dateOfMonth: this.getDateOfMonth(),
                        month: this.getMonthOfTheYear(),
                        weatherDesc: this.getWeatherDesc(),
                        formatTimeAMPM: this.getFormattedTimeAMPM(),
                        temp: this.getProjectTemp(),
                        weatherImg: this.getWeatherImg()
                    }
                });
            });
        }
    }

    isEmpty = (obj) => {
        return Object.keys(obj).length === 0;
    }


    render() {
        console.log('cityWeatherData is changed', this.props.cityWeatherData, this.state.cityWeatherData);
        return (
            <div className="city-tile-container">
                <h3>{this.state.currentTileData.dayOfWeek}</h3>
                <div className="city-date-time">{this.state.currentTileData.formattedDate}</div>
                <div className="forecast-image"> <img alt="Weather" src={this.state.currentTileData.weatherImg} /> </div>
                <div className="city-temp">
                    <h2>{this.state.currentTileData.temp} C</h2>
                </div>
                <div className="city-weather-info">{this.state.currentTileData.weatherDesc}</div>
            </div>
        );
    }
};

export default WeatherTile;
