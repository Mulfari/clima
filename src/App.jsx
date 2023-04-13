import { useState } from 'react';
import Weather from './components/Weather';
import './App.css';

function App() {
  const [search, setSearch] = useState('');
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {
    const apiKey = 'a391e33ab6494e0851324aca91e03228';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setWeather(data);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    getWeather();
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search city"
          value={search}
          onChange={handleSearchChange}
        />
        <button type="submit">Search</button>
      </form>
      <Weather weather={weather} />
    </div>
  );
}

export default App;
