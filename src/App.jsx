import React, { useState, useEffect } from 'react';
import Weather from './components/Weather';
import './App.css';

const App = () => {
  const [background, setBackground] = useState('');

  useEffect(() => {
    const setAppBackground = () => {
      const weatherBackground = document.querySelector('.App');
      const weatherCode = background.slice(0, 2);

      switch (weatherCode) {
        case '01':
        case '02':
          weatherBackground.style.backgroundImage = 'url(/images/clear-sky.jpg)';
          break;
        case '03':
        case '04':
          weatherBackground.style.backgroundImage = 'url(/images/cloudy.jpg)';
          break;
        case '09':
        case '10':
          weatherBackground.style.backgroundImage = 'url(/images/rain.jpg)';
          break;
        case '11':
          weatherBackground.style.backgroundImage = 'url(/images/thunderstorm.jpg)';
          break;
        case '13':
          weatherBackground.style.backgroundImage = 'url(/images/snow.jpg)';
          break;
        case '50':
          weatherBackground.style.backgroundImage = 'url(/images/mist.jpg)';
          break;
        default:
          weatherBackground.style.backgroundImage = 'url(/images/default.jpg)';
      }
    };

    setAppBackground();
  }, [background]);

  return (
    <div className="App">
      <Weather setBackground={setBackground} />
    </div>
  );
};

export default App;
