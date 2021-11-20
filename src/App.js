import React, { useState } from 'react';
import { api_key } from './data.js';
import './App.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { BrowserRouter, Link } from "react-router-dom";
import Weather from './components/weather.js';

function App() {
  let [userInput, setUserInput] = useState('');
  // const [isLoading, setIsLoading] = useState(false);
  // const [weatherData, setWeatherData] = useState({});
  // const [apiError, setApiError] = useState({});

  function handleInputChange(e) {
    setUserInput(e.target.value);
  }

  function handleSubmit() {
    console.log('userInput: ', userInput);
  }

  function handleClear() {
    setUserInput('');
  }

  async function getLocationWeather(city) {
    try {
      const result = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},AU&limit=5&appid=${api_key}`);

      if (result.status === 200) {
        let result_data = await result.json();
        const lat = result_data[0].lat;
        const lon = result_data[0].lon;
        console.log('lat lon: ', result_data[0].lat, result_data[0].lon);
        getWeatherData(lat, lon);
        return { success: true, data: await result.json() };
      }

      return { success: false, error: result.statusText };
    } catch (ex) {
      return { success: false, error: ex.message };
    }
  }

  async function getWeatherData(lat, lon) {
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

  return (
    <BrowserRouter>
      <div className="App">
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="h6" color="inherit" component="div">
              <Link  to="/" style={{ color: 'white', 'textDecoration': 'none' }} underline="none">Boolean-it</Link >
            </Typography>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Typography variant="h6" color="inherit" component="div">
              <Link  to="/instructions" style={{ color: 'white', 'textDecoration': 'none' }} underline="none">Instructions</Link >
            </Typography>
          </Toolbar>
        </AppBar>
        {/* Enter name of city:<br />
        <br />
        <TextField id="standard-basic" value={userInput} onChange={handleInputChange} label="Standard" variant="standard" />
        <br /> <br />
        <Button variant="contained" onClick={handleSubmit}>Submit</Button>
        &nbsp;&nbsp;&nbsp;
        <Button variant="contained" onClick={handleClear}>Clear</Button>
        &nbsp;&nbsp;&nbsp;
        <Button variant="contained" onClick={() => getLocationWeather(userInput)}>Search</Button>
        <br /><br /> */}
        <Weather />

      </div>
    </BrowserRouter>
  );
}

export default App;
