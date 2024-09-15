import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Weather.css'; // CSS dosyasını import edin

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('London'); // Başlangıç şehir adı
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError(null); // Önceki hataları temizle

      try {
        const apiKey = '670905e88ff78eb44fa509e01027f30f'; // API anahtarınızı buraya ekleyin
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        setWeather(response.data);
      } catch (err) {
        setError('Unable to fetch weather data. Please check the city name and try again.');
      } finally {
        setLoading(false);
      }
    };

    if (city) { // Şehir adı boş değilse API çağrısı yap
      fetchWeather();
    }
  }, [city]); // Şehir adı değiştiğinde useEffect tetiklenir

  const handleCityChange = (e) => {
    setCity(e.target.value); // Kullanıcının girdiği şehir adı
  };

  return (
    <div>
      <input
        type="text"
        value={city}
        onChange={handleCityChange}
        placeholder="Enter city"
      />
      <div className="weather-container">
        {loading && <p className="loading-message">Loading...</p>}
        {error && <p className="error-message">Error: {error}</p>}
        {weather && (
          <div className="weather-info">
            <h2>{weather.name}</h2>
            <p>Temperature: {weather.main.temp}°C</p>
            <p>Weather: {weather.weather[0].description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
