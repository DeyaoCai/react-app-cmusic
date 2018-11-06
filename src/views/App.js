import React, { Component } from 'react';

import logo from '../images/logo.svg';
import './App.css';
import {HashRouter,Route} from 'react-router-dom';
import Home from './Home/Home.js';
import My from './My/My.js';

const App = () => (
  <HashRouter basename="/">
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <audio src="" id="audio"></audio>
      <Route path="/home" component={Home}/>
      {/*<Route path="/my" component={My}/>*/}
    </div>
  </HashRouter>
);

export default App;
