import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Weather from './weather';
import '../App.css';

const CAPITAL_CITIES = ['Canberra', 'Sydney', 'Darwin', 'Brisbane', 'Adelaide', 'Hobart', 'Melbourne', 'Perth'];

function Favourites() {
    let [isCities, setCities] = useState();
    // let [isRouting, setRouting] = useState(0);
    // let [isDataReady, setDataReady] = useState(false);
    // const navigate = useNavigate();

    function getCitiesFromLocalStorage() {
        let cities = [];
        CAPITAL_CITIES.forEach((city) => {
            if (localStorage.getItem(city)) {
                cities.push(city);
            }
        });

        cities ? setCities(cities.sort()) : setCities(null);
        return;
    }

    useEffect(() => {
        getCitiesFromLocalStorage();
    // }, [isRouting]);
    }, []);

    // function routeToWeather(props) {
    //     setDataReady(!isDataReady);
    //     // setRouting(isRouting + 1);
    //     // navigate(`/:${props}`);
    // };

    return (
        <div className="App">
            <Typography variant="h4" gutterBottom component="div" style={{ 'margin-top': '20px' }}>
                My Favorite Cities
            </Typography>
            <br />
            <div>
                {isCities &&
                    isCities.map((city, index) =>
                        <>
                            <Chip
                                label={city}
                                key={`favorites_${index}`}
                                variant="outlined"
                                style={{ height: '50px', width: 'fit-content', 'font-size': '18px', 'mid-width': '200px' }}
                                // onClick={() => routeToWeather(city)}
                            />
                            {/* {
                                isDataReady && 
                                <Weather props={city} />
                            } */}
                            <br /><br />
                        </>
                    )
                }
            </div>
        </div>
    );
}

export default Favourites;
