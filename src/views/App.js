import React, { Component } from 'react';
import logo from '../images/logo.svg';
import '../styles/App.css';

import {HashRouter,Route} from 'react-router-dom';
import Home from './Home';
import My from './My';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      audioInfo: {src:"",}
    };
  };
  componentDidMount() {

  };
  render() {
    return (
      <HashRouter basename="/">
        <div className="App">
          <img src={logo} className="App-logo" alt="logo" />
          <audio src={this.state.audioInfo.src} id="audio"></audio>
          <Route path="/home" component={Home}/>
          <Route path="/my" component={My}/>
        </div>
      </HashRouter>
    );
  }
}
export default App;
