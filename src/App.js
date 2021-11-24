import React, { Component } from 'react';
import Navigation from './components/Navigation.js';
import Logo from './components/Logo.js';
import './App.css';


class App extends Component {
  render() {
    return (
          <div className="App">
            <Navigation />
            <Logo />
            {/*<ImageLinkForm />
            <FaceRecognition />*/}
          </div>
    );
  }
}


export default App;