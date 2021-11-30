import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import TempCard from '../components/tempCard.js';
import timeConverter from '../utils/timeConverter.js';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
import { api_key } from '../data.js';
import '../App.css';

// const LOCAL_STORAGE_KEY = "locations_";
function Weather() {
    let [userInput, setUserInput] = useState('');
    let [isDataReady, setDataReady] = useState(false);
    let [weatherData, setWeatherData] = useState(false);
    let [cityName, setCityName] = useState('');
    let [isFavorite, setIsFavorite] = useState(false);

    function handleInputChange(e) {
        setUserInput(e.target.value);
    }

    function handleClear() {
        setUserInput('');
    }

    async function getLocationWeather(city) {
        try {
            setDataReady(false);
            const result = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},AU&limit=5&appid=${api_key}`);
            if (result.status === 200) {
                let result_data = await result.json();
                const lat = result_data[0].lat;
                const lon = result_data[0].lon;
                let weather_data = (await getWeatherData(lat, lon)).data;
                console.log(weather_data);
                const mapped_data = mapWeatherData(weather_data);
                setWeatherData(mapped_data);
                // console.log('cityName: ', cityName);
                // console.log('cityName: ', checkIfFavorite(cityName));
                // checkIfFavorite(cityName) ? setIsFavorite(true) : setIsFavorite(false);
                // console.log('after cityName: ', checkIfFavorite(cityName));
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
        console.log('city name after setCityName: ', city_name);
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
        checkIfFavorite(city_name) ? setIsFavorite(true) : setIsFavorite(false);
        return result;
    }

    function handleFavClick() {
        setIsFavorite(!isFavorite);
        // if(isFavorite) {
        //     localStorage.setItem(cityName, cityName);
        // }
    }

    function checkIfFavorite(cityName) {
        // let city_name = data.timezone.split('/').pop();
        console.log('city searched by user: ', cityName);
        console.log('localStorage.getItem(name): ', localStorage.getItem(cityName));
        if (localStorage.getItem(cityName)) {
            return true;
        }
        return false;
    }

    function addToFavorites() {
        localStorage.setItem(cityName, cityName);
        setIsFavorite(true);
    }

    function removeFromFavorites() {
        // if (localStorage.getItem(cityName)) {
        localStorage.removeItem(cityName);
        setIsFavorite(false);
        // }
    }

    function StarIconComponent() {
        // localStorage.setItem(cityName, cityName);
        return (
            <StarIcon
                style={{ fontSize: "30px", cursor: 'pointer' }}
                onClick={removeFromFavorites}
            />
        );
    }

    function StarOutlineIconComponent() {
        // if (localStorage.getItem(cityName)) {
        //     localStorage.removeItem(cityName);
        // }
        return (
            <StarOutlineIcon
                style={{ fontSize: "30px", cursor: 'pointer' }}
                onClick={addToFavorites}
            />
        );
    }

    function CheckFav() {
        console.log('cityName: ', cityName);
        console.log('isFav: ', isFavorite);
        if (localStorage.getItem(cityName)) {
            return true;
        }
        return false;
    }

    return (
        <div className="App">
            Enter name of city:<br />
            <br />
            <TextField id="standard-basic" value={userInput} onChange={handleInputChange} label="Standard" variant="standard" />
            <br /> <br />
            <Button variant="contained" onClick={handleClear}>Clear</Button>
            &nbsp;&nbsp;&nbsp;
            <Button variant="contained" onClick={() => getLocationWeather(userInput)}>Search</Button>
            <br /><br />
            {isDataReady &&
                <div>
                    <Chip label={cityName} variant="outlined" style={{ height: '50px', width: 'fit-content', 'font-size': '18px', 'mid-width': '200px' }} />
                    {isFavorite ? <StarIconComponent /> : <StarOutlineIconComponent />}
                </div>
            }
            <br /><br />
            <Grid container spacing={3} >
                {isDataReady &&
                    weatherData.map((data, index) =>
                        <Grid item xs={3}>
                            <TempCard properties={data} key={index} />
                        </Grid>
                    )
                }
            </Grid>
        </div>
    );
}

export default Weather;
