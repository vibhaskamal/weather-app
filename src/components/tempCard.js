import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import '../App.css';

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

// export default function TempCard(degree = 10, clouds = 10, humidity = 10, wind = 10) {
export default function TempCard(props) {
    // const temperature = (
    //     <div>
    //         {temp}
    //     </div>
    // );

    // var x = props.clouds.toString();
    console.log('props: ', props.properties.clouds);
    console.log('props.clouds: ', props['clouds']);
    console.log('props.clouds: ', props[0]);
    // console.log('humidity: ', props.humidity);

    return (
        <div className="temp-card" style={{ textAlign: 'left' }}>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        Perth, AU
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        21 November 2021
                    </Typography>
                    <Typography variant="body2">
                        {`Temperature: ${props.properties.temperature}`}
                        <br />
                        {`Clouds: ${props.properties.clouds}`}
                        <br />
                        {`Humidity: ${props.properties.humidity}`}
                        <br />
                        {`Wind speed: ${props.properties.wind}`}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        </div>
    );
}
