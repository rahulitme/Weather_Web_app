// App.js
import React, { useState } from 'react';
import WeatherCard from './components/WeatherCard';
import { apiKey } from './apiConfig';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
      
      const data = await response.json();
      if (response.ok) {
        setWeather(data);
        setError(null);
      } else {
        setError(data.message);
        setWeather(null);
      }
    } catch (err) {
      setError('Failed to fetch weather data');
      setWeather(null);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#d0e7ff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '20px' }}>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', marginBottom: '16px' }}
      />
      <button
        onClick={fetchWeather}
        style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', borderRadius: '4px', cursor: 'pointer' }}
      >
        Get Weather
      </button>

      {error && <p style={{ color: 'red', marginTop: '20px' }}>Error: {error}</p>}
      {weather && <WeatherCard weather={weather} />}
    </div>
  );
};

export default App;