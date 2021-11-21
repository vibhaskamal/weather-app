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

const card = (
  <React.Fragment>
    <CardContent>
      {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Word of the Day
      </Typography> */}
      <Typography variant="h5" component="div">
        Perth, AU
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        21 November 2021
      </Typography>
      <Typography variant="body2">
        Temperature:
        <br />
        Clouds:
        <br />
        Humidity:
        <br />
        Wind speed:
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Learn More</Button>
    </CardActions>
  </React.Fragment>
);

function card2(temp, clouds, humidity, wind) {
  return (
    <React.Fragment>
      <CardContent>
        {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Word of the Day
      </Typography> */}
        <Typography variant="h5" component="div">
          Perth, AU
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          21 November 2021
        </Typography>
        <Typography variant="body2">
          Temperature: ${temp}
          <br />
          Clouds:
          <br />
          Humidity:
          <br />
          Wind speed:
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </React.Fragment>
  );
};

export default function BasicCard(temp = 10, clouds = 10, humidity = 10, wind = 10) {
  return (
    <div className="temp-card" style={{ textAlign: 'left' }}>
      <Box sx={{ minWidth: 275, maxWidth: 300 }}>
        <Card variant="outlined" temp={temp} clouds={clouds} humidity={humidity} wind={wind}>
          {card}
          {/* <card2 /> */}
        </Card>
      </Box>
    </div>
  );
}