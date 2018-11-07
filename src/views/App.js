import React, { Component } from 'react';

import logo from '../images/logo.svg';
import './App.css';
import {HashRouter,Route} from 'react-router-dom';
import Discover from './Discover/Discover.js';
import My from './My/My.js';

const App = () => (
  <HashRouter basename="/">
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <audio src="" id="audio"></audio>
      <Route path="/discover" component={Discover}/>
      {/*<Route path="/my" component={My}/>*/}
    </div>
  </HashRouter>
);

export default App;
