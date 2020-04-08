import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import Charts from "./components/Charts";
import Navbar from "./components/Navbar";

import "./styles.scss";

const App = () => {
  const [coinData, setCoinData] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true"
      )
      .then(res => setCoinData(res.data))
      .catch(err => console.log(err));
  }, []);
  return (
    <div className="App">
      <Router>
        <Navbar types={[...coinData.map(i => ({symbol: i.symbol, name: i.name}))]} />
        <Switch>
          <Route path="/tracker/:code" render={props => <Charts coinData={[...coinData.filter(i => i.symbol === props.match.params.code)]} />} />
          <Route render={props => <Redirect to="/tracker/btc" />} />
        </Switch>
      </Router>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
