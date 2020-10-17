import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css'; 

import Routes from './Root';

class App extends Component {
  constructor(props) {
    super(props);
    this.setstate = {

    }
  }

  render() {
    return (
      <div className="App">
          <Routes />
      </div>
    )
  }
}

export default App;
