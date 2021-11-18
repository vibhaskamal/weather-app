import React, { useState, useEffect } from 'react';
import { api_key } from './data.js';
import './App.css';

function App() {
  let [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [weatherData, setWeatherData] = useState({});
  const [apiError, setApiError] = useState({});

  function handleInputChange(e) {
    setUserInput(e.target.value);
  }

  function handleSubmit() {
    console.log('userInput: ', userInput);
  }

  function handleClear() {
    setUserInput('');
  }

  // async function getLocationWeather() {
  //   console.log('userInput: ', userInput);
  //   try {
  //     const result = await fetch(`api.openweathermap.org/data/2.5/forecast/daily?q=melb&units=metric&cnt=7&appid=${api_key}`);

  //     if (result.status === 200) {
  //       let result_data = await result.json();
  //       console.log('result: ', result_data);
  //       return { success: true, data: await result.json() };
  //     }

  //     return { success: false, error: result.statusText };
  //   } catch (ex) {
  //     return { success: false, error: ex.message };
  //   }
  // }

  async function getLocationWeather() {
    try {
      const result = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=melbourne,AU&limit=5&appid=${api_key}`);

      if (result.status === 200) {
        let result_data = await result.json();
        const lat = result_data[0].lat;
        const lon = result_data[0].lon;
        // console.log('result: ', result_data);
        console.log('lat lon: ', result_data[0].lat, result_data[0].lon);
        getWeatherData(lat, lon);
        return { success: true, data: await result.json() };
      }

      return { success: false, error: result.statusText };
    } catch (ex) {
      return { success: false, error: ex.message };
    }
  }

  async function getWeatherData(lat=33.44, lon=-94.04) {
    try {
      const result = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=${api_key}`);

      if (result.status === 200) {
        let result_data = await result.json();
        console.log('result: ', result_data);
        return { success: true, data: await result.json() };
      }

      return { success: false, error: result.statusText };
    } catch (ex) {
      return { success: false, error: ex.message };
    }
  }

  useEffect(() => {
    const loadingIndicatorTimeout = setTimeout(() => setIsLoading(true), 500);
    const getWeather = async () => {
      const result = await getLocationWeather();
      // if (result.success) {
      //   setWeatherData(result)
      // }
      setWeatherData(result.success ? result.data : {});
      setApiError(result.success ? "" : result.error);
      console.log('weather data: ', weatherData);
      console.log('weather error: ', apiError);
    };
  
    getWeather();
  }, []);

  return (
    <div className="App">
      Enter name of city:<br />
      <input type="text" value={userInput} onChange={handleInputChange} />
      <br />
      <button onClick={handleSubmit}>
        Submit
      </button>
      <button onClick={handleClear}>
        Clear
      </button>
      <button onClick={getLocationWeather}>
        Search
      </button>
      <br /><br />
      <textarea value = {weatherData} />
    </div>
  );
}

export default App;
