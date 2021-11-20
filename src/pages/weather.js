import React, { useState } from 'react';
import { api_key } from '../data.js';
import '../App.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import BasicCard from '../components/basicCard.js';

function Weather() {
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
        <div className="App">
            Enter name of city:<br />
            <br />
            <TextField id="standard-basic" value={userInput} onChange={handleInputChange} label="Standard" variant="standard" />
            <br /> <br />
            <Button variant="contained" onClick={handleSubmit}>Submit</Button>
            &nbsp;&nbsp;&nbsp;
            <Button variant="contained" onClick={handleClear}>Clear</Button>
            &nbsp;&nbsp;&nbsp;
            <Button variant="contained" onClick={() => getLocationWeather(userInput)}>Search</Button>
            <br /><br />
            <BasicCard />
        </div>
    );
}

export default Weather;
