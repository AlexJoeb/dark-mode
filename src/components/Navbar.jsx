import React, { useState, useEffect } from 'react';
import useDarkMode from '../hooks/useDarkMode';

import {
  useLocation,
  useHistory
} from 'react-router-dom';

const Navbar = ({ types }) => {
  const [darkMode, setDarkMode] = useDarkMode(false);

  const location = useLocation();
  const history = useHistory();
  const current = location.pathname.split('/')[2];

  const toggleMode = e => {
    e.preventDefault();
    setDarkMode(!darkMode);
  };

  const handleChange = e => {
    const { value } = e.target;
    const symbol = types.find(i => i.name === value).symbol;
    
    history.push(`/tracker/${symbol}`);
  }

  return (
    <nav className="navbar">
      <h1>Crypto Tracker</h1>
      <select value={types.length ? types.find(i => i.symbol === current).name : "Bitcoin"} onChange={handleChange}>
        {
          types.map((option, index) => (
            <option key={index} defaultValue={option.symbol}>{option.name}</option>
          ))
        }
      </select>
      <div className="dark-mode__toggle">
        <div
          onClick={toggleMode}
          className={darkMode ? 'toggle toggled' : 'toggle'}
        />
      </div>
    </nav>
  );
};

export default Navbar;
