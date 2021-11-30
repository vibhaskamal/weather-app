import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import '../App.css';

export default function TempCard(props) {
    return (
        <div className="temp-card" style={{ textAlign: 'left' }}>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography variant="h5" component="div">
                    {props.properties.date}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {props.properties.day}
                    </Typography>
                    <Typography variant="body2">
                        {`Maximum: ${props.properties.max_temp}\u00b0C`}
                        <br />
                        {`Minimum: ${props.properties.min_temp}\u00b0C`}
                        <br />
                        {`Clouds: ${props.properties.clouds} %`}
                        <br />
                        {`Humidity: ${props.properties.humidity} %`}
                        <br />
                        {`Wind speed: ${props.properties.wind} m/s`}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}
