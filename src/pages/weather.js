import React, { useState } from 'react';
import { api_key } from '../data.js';
import '../App.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import TempCard from '../components/tempCard.js';
import timeConverter from '../utils/timeConverter.js';
import Grid from '@mui/material/Grid';

function Weather() {
    let [userInput, setUserInput] = useState('');
    let [isDataReady, setDataReady] = useState(false);
    let [weatherData, setWeatherData] = useState(false);

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
            // const result = mock_lat_lon_data;
            // console.log(result.status);


            if (result.status === 200) {
                let result_data = await result.json();
                // console.log('hello');
                // let result_data = result;
                // console.log('result_data: ', result_data);
                const lat = result_data[0].lat;
                const lon = result_data[0].lon;
                console.log('lat lon: ', result_data[0].lat, result_data[0].lon);
                let weather_data = (await getWeatherData(lat, lon)).data;
                console.log(weather_data);
                // return { success: true, data: await result.json() };
                const mapped_data = mapWeatherData(weather_data);
                console.log('mapped_data: ', mapped_data);
                setWeatherData(mapped_data);
                setDataReady(true);
                return { success: true, data: weather_data };
            }

            return { success: false, error: result.statusText };
        } catch (ex) {
            return { success: false, error: ex.message };
        }
    }

    async function getWeatherData(lat, lon) {
        try {
            const result = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=${api_key}`);
            // const result = mock_weather_data;
            // console.log('result: ', result);
            if (result.status === 200) {
                let result_data = await result.json();
                // let result_data = result;
                console.log('result: ', result_data);
                console.log('date: ', result_data.daily[0].dt);
                console.log('date time: ', timeConverter(result_data.daily[0].dt).date);
                return { success: true, data: result_data };
            }

            return { success: false, error: result.statusText };
        } catch (ex) {
            return { success: false, error: ex.message };
        }
    }

    function mapWeatherData(data) {
        let result = [];
        console.log('data to map: ', data);
        data.daily.forEach((obj) => {
            result.push({
                date: timeConverter(obj.dt).date,
                day: timeConverter(obj.dt).day,
                max_temp: obj.temp.max,
                min_temp: obj.temp.min,
                clouds: obj.clouds,
                humidity: obj.humidity,
                wind: obj.wind_speed
            })
        });
        console.log('mappedData: ', result);
        return result;
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
            <Grid container spacing={3} >
                {isDataReady && weatherData.map((data, index) =>
                    <Grid item xs={3}>
                        <TempCard properties={data} />
                    </Grid>
                )}
            </Grid>
        </div>
    );
}

export default Weather;
