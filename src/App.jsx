import React, { useState, useEffect } from 'react';
import './App.css';
import Weather from './components/Weather';
import clear from './components/images/clear.jpg';
import clouds from './components/images/clouds.jpg';
import rain from './components/images/rain.jpg';
import snow from './components/images/snow.jpg';
import thunderstorm from './components/images/thunderstorm.jpg';


const App = () => {
  const [weatherData, setWeatherData] = useState({
    cityName: '',
    temperature: '',
    description: '',
    weatherId: '',
  });

  const getBackgroundImage = (weatherId) => {
    if (weatherId >= 200 && weatherId <= 232) {
      return thunderstorm;
    } else if (weatherId >= 300 && weatherId <= 531) {
      return rain;
    } else if (weatherId >= 600 && weatherId <= 622) {
      return snow;
    } else if (weatherId >= 701 && weatherId <= 781) {
      return clouds;
    } else if (weatherId === 800) {
      return clear;
    } else if (weatherId >= 801 && weatherId <= 804) {
      return clouds;
    } else {
      return clear;
    }
  };
  

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        'https://api.openweathermap.org/data/2.5/weather?q=Bogota&appid=a391e33ab6494e0851324aca91e03228&units=metric'
      );
      const data = await response.json();
      setWeatherData({
        cityName: data.name,
        temperature: data.main.temp.toFixed(1),
        description: data.weather[0].description,
        weatherId: data.weather[0].id,
      });
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${getBackgroundImage(weatherData.weatherId)})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Weather
        cityName={weatherData.cityName}
        temperature={weatherData.temperature}
        description={weatherData.description}
      />
    </div>
  );
};

export default App;
