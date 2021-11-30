import React from 'react';
import '../App.css';

function Favourites() {
    let city = localStorage.getItem('locations_');
    return (
        <div className="App">
            Favourites
            <br />
            {city}
        </div>
    );
}

export default Favourites;
