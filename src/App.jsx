import React, { useState } from 'react';
import './App.css';
import Weather from './components/Weather';
import clear from './components/images/clear.jpg';
import clouds from './components/images/clouds.jpg';
import rain from './components/images/rain.jpg';
import snow from './components/images/snow.jpg';
import thunderstorm from './components/images/thunderstorm.jpg';

const App = () => {
  const [backgroundImage, setBackgroundImage] = useState(clear);

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

  const handleWeatherData = (weatherData) => {
    setBackgroundImage(getBackgroundImage(weatherData.weather[0].id));
  };

  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Weather onWeatherData={handleWeatherData} />
    </div>
  );
};

export default App;
