import React, { useState, useEffect } from 'react';
import Chip from '@mui/material/Chip';
import '../App.css';

const CAPITAL_CITIES = ['Canberra', 'Sydney', 'Darwin', 'Brisbane', 'Adelaide', 'Hobart', 'Melbourne', 'Perth'];

function Favourites() {
    let [isCities, setCities] = useState();

    function getCitiesFromLocalStorage() {
        let cities = [];
        CAPITAL_CITIES.forEach((city) => {
            if (localStorage.getItem(city)) {
                cities.push(city);
            }
        })

        cities ? setCities(cities.sort()) : setCities(null);
        return;
    }

    useEffect(() => {
        getCitiesFromLocalStorage();
    });

    return (
        <div className="App">
            Favourites
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
