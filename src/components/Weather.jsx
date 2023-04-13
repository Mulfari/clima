import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Weather.css';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [temperatureUnit, setTemperatureUnit] = useState('metric');

  useEffect(() => {
    const getWeatherData = async () => {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=a391e33ab6494e0851324aca91e03228&units=${temperatureUnit}`;
        const response = await axios.get(url);
        setWeatherData(response.data);
      }, () => {
        console.log('Error getting position');
      }, options);
    };

    getWeatherData();
  }, [temperatureUnit]);

  const handleClick = () => {
    const newUnit = temperatureUnit === 'metric' ? 'imperial' : 'metric';
    setTemperatureUnit(newUnit);
  };

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const { name, sys, weather, main, wind } = weatherData;
  const { country } = sys;
  const { icon, description } = weather[0];
  const { temp, humidity } = main;
  const { speed, deg } = wind;

  return (
    <div className="weather">
      <div className="weather-header">
        <h2 className="weather-title">{name}, {country}</h2>
        <button className="weather-unit-button" onClick={handleClick}>
          {temperatureUnit === 'metric' ? '°C' : '°F'}
        </button>
      </div>
      <div className="weather-info">
        <div className="weather-icon">
          <img src={`http://openweathermap.org/img/w/${icon}.png`} alt={description} />
        </div>
        <div className="weather-temp">
          Temperature: {temp.toFixed(1)} {temperatureUnit === 'metric' ? '°C' : '°F'}
        </div>
        <div className="weather-desc">
          Description: {description}
        </div>
        <div className="weather-humidity">
          Humidity: {humidity}%
        </div>
        <div className="weather-wind">
          Wind: {speed} m/s, {deg}°
        </div>
        <div className="weather-pressure">
          Pressure: {main.pressure} hPa
        </div>
        <div className="weather-feels-like">
          Feels like: {main.feels_like.toFixed(1)} {temperatureUnit === 'metric' ? '°C' : '°F'}
        </div>
      </div>
    </div>
  );
};

export default Weather;
