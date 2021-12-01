import React, { useState, useEffect } from 'react';
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

        cities ? setCities(cities) : setCities(null);
        return;
    }

    useEffect(() => {
        getCitiesFromLocalStorage();
    });

    return (
        <div className="App">
            Favourites
            <br />
            {isCities &&
                isCities.map((city, index) =>
                    // <li>
                        <ul key={`favorites_${index}`}>{city}</ul>
                    // </li>
                )
            }
        </div>
    );
}

export default Favourites;
