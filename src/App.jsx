// App.jsx

import React, { useState } from 'react';
import './App.css';
import Weather from './components/Weather';
import clear from './components/images/clear.jpg';
import clouds from './components/images/clouds.jpg';
import rain from './components/images/rain.jpg';
import snow from './components/images/snow.jpg';
import thunderstorm from './components/images/thunderstorm.jpg';

function App() {
  const [backgroundImage, setBackgroundImage] = useState('');

  const getBackgroundImage = (icon) => {
    const weatherType = icon.slice(0, 2);
    switch (weatherType) {
      case '01':
      case '02':
        return `url(${clear})`;
      case '03':
      case '04':
        return `url(${clouds})`;
      case '09':
      case '10':
        return `url(${rain})`;
      case '11':
        return `url(${thunderstorm})`;
      case '13':
        return `url(${snow})`;
      default:
        return `url(${clear})`;
    }
  };

  const handleSetBackgroundImage = (icon) => {
    setBackgroundImage(getBackgroundImage(icon));
  };

  return (
    <div className="App" style={{ backgroundImage }}>
      <Weather setBackgroundImage={handleSetBackgroundImage} />
    </div>
  );
}

export default App;
