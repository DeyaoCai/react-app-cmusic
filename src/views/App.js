import React from 'react';
import logo from '../images/logo.svg';
import './App.css';
import {HashRouter,Route} from 'react-router-dom';
import Menu from './Menu.js';

const App = () => (
  <HashRouter basename="/">
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      {/*<Route path="/discover" component={Discover}/>*/}
      <Menu></Menu>
    </div>
  </HashRouter>
);
export default App;
