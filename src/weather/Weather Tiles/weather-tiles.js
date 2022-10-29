import { useEffect, useState, useRef } from "react";
import WeatherTile from "../weather-tile/weather-tile";

// const API_KEY = "d05a97965211c99851bb688a145dfa1a";
const API_KEY = "cc52114b0154d1eaad0a4bbd1f42fff5";



export default function WeatherTiles(props) {
  const [cityWeatherData, setCityWeatherData] = useState({});
  const [cityName, setCityName] = useState('');

  const prevCountRef = useRef();



  useEffect((prevProps) => {
    console.log('useEffect parent', prevProps, prevCountRef.current);
    const fetchData = async () => {
      if(!!props.cityName){
        setCityName(props.cityName);
      }
      const city = cityName || "London";
      const OPEN_WEATHER_API = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`;
      const response = await fetch(OPEN_WEATHER_API);
      const data = await response.json();
      if(city !== prevCountRef.current){
        setCityWeatherData(data);
      }
      prevCountRef.current = city || "London";
    };

    fetchData();
  }, [props.cityName, cityName, cityWeatherData]);

  const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  }

  return (
    <div className="day-forecast-container">
      {!isEmpty(cityWeatherData) ?
        <>
          <h1>{cityName || 'London'}</h1>
          <WeatherTile cityWeatherData={cityWeatherData} currentDayValue={0} />
          <WeatherTile cityWeatherData={cityWeatherData} currentDayValue={8} />
          <WeatherTile cityWeatherData={cityWeatherData} currentDayValue={16} />
          <WeatherTile cityWeatherData={cityWeatherData} currentDayValue={24} />
          <WeatherTile cityWeatherData={cityWeatherData} currentDayValue={32} />
        </> : (<></>)
      }
    </div>
  );
}
