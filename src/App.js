import React from 'react';
import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import Weather from './pages/weather.js';
import Favourites from './pages/favourites';

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
          <Route path="/favourites" element={<Favourites />} />
        </Routes>
        {/* <Weather />
        <Favourites /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
