import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import capitalizeFirstLetter from '../utils/capitalizeLetter.js';
import { CAPITAL_CITIES } from './favourites.js';

export default function Instructions() {
    return (
        <Container className="App">
            <Typography variant="h4" gutterBottom component="div" style={{ 'margin-top': '20px' }}>
                Instructions
            </Typography>
            <br />
            <ul style={{ 'marginTop': '-10px', 'text-align': 'left' }}>
                <li>
                    Enter any of the following Australian capital cities in the search bar on the 'Weather' tab on
                    the menu bar and click on search to check the 7 day weather forecast:
                    <ul>
                        {CAPITAL_CITIES.map((city, index) =>
                            <li style={{ "list-style-type": "circle" }} key={`valid_cities_${index}`}>
                                {capitalizeFirstLetter(city)}
                            </li>
                        )}
                    </ul>
                </li>
                <li>
                    Click on the star icon that appears next to the name of the city in the forecast to pin that city to
                    your favourites list
                </li>
                <li>
                    You can check your favourite cities by clicking on the 'Favourites' tab on the menu bar at the top
                </li>
            </ul>
            <div style={{ marginTop: '60px' }}>
            </div>
        </Container>
    );
};