import React, { Component } from 'react';

import logo from '../images/logo.svg';
import '../styles/App.css';
import {HashRouter,Route} from 'react-router-dom';
import Home from './Home';
import My from './My';

const App = () => (
  <HashRouter basename="/">
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <audio src="" id="audio"></audio>
      <Route path="/home" component={Home}/>
      <Route path="/my" component={My}/>
    </div>
  </HashRouter>
);

export default App;
