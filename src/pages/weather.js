import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
import TempCard from '../components/tempCard.js';
import timeConverter from '../utils/timeConverter.js';
import { api_key } from '../data.js';
import '../App.css';
import { CAPITAL_CITIES } from './favourites.js';

function Weather() {
    let [userInput, setUserInput] = useState('');
    let [isDataReady, setDataReady] = useState(false);
    let [weatherData, setWeatherData] = useState(false);
    let [cityName, setCityName] = useState('');
    let [isFavourite, setIsFavourite] = useState(false);

    function handleInputChange(e) {
        setUserInput(e.target.value);
    }

    function handleClear() {
        setUserInput('');
    }

    async function getLocationWeather(city) {
        if (CAPITAL_CITIES.indexOf(city.toLowerCase()) >= 0) {
            try {
                setDataReady(false);
                const result = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},AU&limit=5&appid=${api_key}`);
                if (result.status === 200) {
                    let result_data = await result.json();
                    const lat = result_data[0].lat;
                    const lon = result_data[0].lon;
                    let weather_data = (await getWeatherData(lat, lon)).data;
                    const mapped_data = mapWeatherData(weather_data);
                    setWeatherData(mapped_data);
                    setDataReady(true);

                    return { success: true, data: weather_data };
                }
                return { success: false, error: result.statusText };
            } catch (ex) {
                return { success: false, error: ex.message };
            }
        }
        else {
            alert('Please enter a valid Australian capital city name (Please refer to the Instruction page for more information)');
            setUserInput('');
        }
    }

    async function getWeatherData(lat, lon) {
        try {
            const result = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=${api_key}`);
            if (result.status === 200) {
                let result_data = await result.json();
                return { success: true, data: result_data };
            }
            return { success: false, error: result.statusText };
        } catch (ex) {
            return { success: false, error: ex.message };
        }
    }

    function mapWeatherData(data) {
        let result = [];
        let city_name = data.timezone.split('/').pop();
        setCityName(city_name);
        data.daily.forEach((obj) => {
            result.push({
                date: timeConverter(obj.dt).date,
                day: timeConverter(obj.dt).day,
                max_temp: Math.trunc(obj.temp.max),
                min_temp: Math.trunc(obj.temp.min),
                clouds: obj.clouds,
                humidity: obj.humidity,
                wind: Math.trunc(obj.wind_speed)
            })
        });
        checkIfFavourite(city_name) ? setIsFavourite(true) : setIsFavourite(false);
        return result;
    }


    function checkIfFavourite(cityName) {
        if (localStorage.getItem(cityName)) {
            return true;
        }
        return false;
    }

    function addToFavourites() {
        localStorage.setItem(cityName, cityName);
        setIsFavourite(true);
    }

    function removeFromFavourites() {
        localStorage.removeItem(cityName);
        setIsFavourite(false);
    }

    function StarIconComponent() {
        return (
            <Tooltip title="Remove from Favourites" placement="right">
                <StarIcon
                    className="star-icon"
                    onClick={removeFromFavourites}
                />
            </Tooltip>
        );
    }

    function StarOutlineIconComponent() {
        return (
            <Tooltip title="Add to Favourites" placement="right">
                <StarOutlineIcon
                    className="star-icon"
                    onClick={addToFavourites}
                />
            </Tooltip>
        );
    }

    return (
        <div className="App">
            <Typography variant="h4" gutterBottom component="div" style={{ 'margin-top': '20px' }}>
                Weather App
            </Typography>
            <br />
            <TextField id="standard-basic" value={userInput} onChange={handleInputChange} label="Enter a city name..." variant="standard" />
            <br /> <br />
            <Button variant="contained" onClick={handleClear}>Clear</Button>
            &nbsp;&nbsp;&nbsp;
            <Button variant="contained" onClick={() => getLocationWeather(userInput)}>Search</Button>
            <br /><br />
            {isDataReady &&
                <div>
                    <Chip label={cityName} variant="outlined" style={{ height: '50px', width: 'fit-content', 'font-size': '18px', 'mid-width': '200px' }} />
                    {isFavourite ? <StarIconComponent /> : <StarOutlineIconComponent />}
                </div>
            }
            <br /><br />
            <Grid container spacing={3} >
                {isDataReady &&
                    weatherData.map((data, index) =>
                        <Grid item xs={3} key={`grid-key-${index}`}>
                            <TempCard properties={data} key={index} />
                        </Grid>
                    )
                }
            </Grid>
        </div>
    );
}

export default Weather;
