import React, { useEffect, useState } from "react";
import "./weather-tile.css";

const API_KEY = "d05a97965211c99851bb688a145dfa1a";
const OPEN_WEATHER_API = `https://api.openweathermap.org/data/2.5/forecast?q=London,gb&appid=d05a97965211c99851bb688a145dfa1a`;

const Tile = () => {
    const [cityData, setCityData] = useState([]);

    

    useEffect(() => {
        const getWeatherData = async () => {
            const response = await fetch(OPEN_WEATHER_API);
            const data = await response.json();
            setCityData(data)
            console.log(data);
        }
        
        getWeatherData();
        formatDayOfTheWeek();
        
    }, []);

    const formatDayOfTheWeek = () =>{
        const Day = new Date(cityData.list[0].dt_txt).toLocaleString('en' ,{ weekday: 'long' })
        console.log('Day',Day);
    };

    return (
        <div className="city-tile-container">
            <h3>Friday</h3>
            <div className="city-date-time">March 1st, 1:00 PM</div>
            <div className="forecast-image">{/* <img /> */}</div>
            <div className="city-temp">
                <h2>35 C</h2>
            </div>
            <div className="city-weather-info">clear sky</div>
        </div>
    );
};

export default Tile;
