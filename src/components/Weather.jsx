import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Weather.css';

const Weather = ({ onWeatherData }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [temperatureUnit, setTemperatureUnit] = useState('metric');
  const [city, setCity] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    const getWeatherData = async () => {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=a391e33ab6494e0851324aca91e03228&units=${temperatureUnit}`;
          const response = await axios.get(url);
          setWeatherData(response.data);
          onWeatherData(response.data);
        },
        () => {
          console.log("Error getting position");
        },
        options
      );
    };

    if (!city) {
      getWeatherData();
    }
  }, []); // Eliminar dependencias

  const handleClick = (e) => {
    e.preventDefault();
    const newUnit = temperatureUnit === 'metric' ? 'imperial' : 'metric';
    setTemperatureUnit(newUnit);
  };

  const searchCity = async (e) => {
    e.preventDefault();
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a391e33ab6494e0851324aca91e03228&units=${temperatureUnit}`;
    try {
      const response = await axios.get(url);
      setWeatherData(response.data);
      setError(false);
      onWeatherData(response.data);
    } catch (error) {
      if (error.response.status === 404) {
        setError(true);
      } else {
        console.log(error);
      }
    }
    setCity('');
  };

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const { name, sys, weather, main, wind } = weatherData;
  const { country } = sys;
  const { icon, description } = weather[0];
  const { temp, humidity } = main;
  const { speed, deg } = wind;
  const tempUnit = temperatureUnit === 'metric' ? '°C' : '°F';

  return (
    <div className="weather">
      <div className="weather-header">
        <h2 className="weather-title">{name}, {country}</h2>
        <button className="weather-unit-button" onClick={handleClick}>
          {tempUnit}
        </button>
      </div>
      <form onSubmit={searchCity}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button type="submit">Search</button>
      </form>
      {error && <div className="alert">No se pudo encontrar la localidad</div>}
<div className="weather-info">
  <div className="weather-icon">
    <img src={`http://openweathermap.org/img/w/${icon}.png`} alt={description} />
  </div>
  <div className="weather-temp">
    Temperature: {temp.toFixed(1)} {tempUnit}
  </div>
</div>
<div className="weather-desc">Description: {description}</div>
<div className="weather-humidity">Humidity: {humidity}%</div>
<div className="weather-wind">
Wind: {speed.toFixed(1)} {temperatureUnit === 'metric' ? 'm/s' : 'mph'}, {deg}°
</div>
</div>
);
};

export default Weather;