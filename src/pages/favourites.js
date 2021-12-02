import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import capitalizeFirstLetter from '../utils/capitalizeLetter';
import '../App.css';

export const CAPITAL_CITIES = ['adelaide', 'brisbane', 'canberra', 'darwin', 'hobart', 'melbourne', 'perth', 'sydney'];

function Favourites() {
    let [isCities, setCities] = useState();

    useEffect(() => {
        let cities = [];
        CAPITAL_CITIES.forEach((city) => {
            let valid_city_name = capitalizeFirstLetter(city);
            if (localStorage.getItem(valid_city_name)) {
                cities.push(valid_city_name);
            }
        });

        cities ? setCities(cities.sort()) : setCities(null);
    }, []);

    return (
        <div className="App">
            <Typography variant="h4" gutterBottom component="div" style={{ 'margin-top': '20px' }}>
                My Favourite Cities
            </Typography>
            <br />
            <div>
                {isCities &&
                    isCities.map((city, index) =>
                        <>
                            <Chip
                                label={city}
                                key={`favourites_${index}`}
                                variant="outlined"
                                style={{ height: '50px', width: 'fit-content', 'font-size': '18px', 'mid-width': '200px' }}
                            />
                            <br /><br />
                        </>
                    )
                }
            </div>
        </div>
    );
}

export default Favourites;
