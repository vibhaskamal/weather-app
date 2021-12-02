import React from 'react';
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Weather from './pages/weather.js';
import Favourites from './pages/favourites';
import './App.css';

const CAPITAL_CITIES = ['Canberra', 'Sydney', 'Darwin', 'Brisbane', 'Adelaide', 'Hobart', 'Melbourne', 'Perth'];

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="h6" color="inherit" component="div">
              <Link to="/" style={{ color: 'white', 'textDecoration': 'none' }} underline="none">Weather</Link >
            </Typography>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Typography variant="h6" color="inherit" component="div">
              <Link to="/favourites" style={{ color: 'white', 'textDecoration': 'none' }} underline="none">Favourites</Link >
            </Typography>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/" element={<Weather />} />
          {/* <Route path="/:city_name" element={<Weather />} /> */}
          <Route path="/favourites" element={<Favourites />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
