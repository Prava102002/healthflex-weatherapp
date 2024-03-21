import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './weatherApp.css'; // Importing CSS file for styling

const API_KEY = 'IZnce2GrHVPwQIu37xyx0NlAKfyOyLeJ';

const WeatherApp = () => {
    const [location, setLocation] = useState('');
    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecastWeather, setForecastWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      // Fetching the real-time weather data and forecast data when component mounts
      fetchCurrentWeather('Vijayawada');
      fetchForecastWeather('Vijayawada');
    }, []);
  
    const fetchCurrentWeather = async (location) => {
      try {
        setLoading(true);
        const response = await axios.get(`https://api.tomorrow.io/v4/timelines?location=${location}&fields=temperature&timesteps=current&apikey=${API_KEY}`);
        setCurrentWeather(response.data.data.timelines[0].intervals[0].values.temperature);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
  
    const fetchForecastWeather = async (location) => {
      try {
        setLoading(true);
        const response = await axios.get(`https://api.tomorrow.io/v4/timelines?location=${location}&fields=temperature&timesteps=1d&apikey=${API_KEY}`);
        setForecastWeather(response.data.data.timelines[0].intervals.map(interval => interval.values.temperature));
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
  
    const handleLocationChange = (event) => {
      setLocation(event.target.value);
    };
  
    const handleLocationSubmit = () => {
      fetchCurrentWeather(location);
      fetchForecastWeather(location);
    };
  
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>Weather App With React</h1>
        <input
          type="text"
          value={location}
          onChange={handleLocationChange}
          placeholder="Enter location"
        />
        <button onClick={handleLocationSubmit}>Submit</button>
        <div className="weather-box">
        <p > <span className='location'>Current location: </span>
     {location || 'Vijayawada'}</p>
        <div className="weather-details">
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          {currentWeather && (
            <div>
              <p><strong>Current Temperature:</strong> {currentWeather}°C</p>
            </div>
          )}
          {forecastWeather && (
            <div>
              <p><strong>Forecasted Temperatures:</strong></p>
              {forecastWeather.map((temp, index) => (
                <p key={index}><strong>
                     Day {index + 1}:
                </strong>
                {temp}°C</p>
              ))}
            </div>
          )}
        </div>
        </div>
      </div>
    );
  };
  
  export default WeatherApp;
