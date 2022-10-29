import { useState } from "react";
import "./App.css";
import Header from "./weather/header/header";
import SearchCity from "./weather/search/search-city";
import WeatherTiles from "./weather/Weather Tiles/weather-tiles";

export default function App() {

  const [cityName, setCityName] = useState('');


  const onChangeHandler = (ev, cityName) => {
    console.log('onChangeHandler APP.JS', ev, cityName);
    setCityName(cityName);
  }

  return (
    <div className="App">
      <Header />
      <br />
      <SearchCity onChange={onChangeHandler} />
      <br />
      <WeatherTiles cityName={cityName} />
    </div>
  );
}
