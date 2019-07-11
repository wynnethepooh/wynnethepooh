import React from 'react';
import logo from './logo.svg';
import './App.css';
import { slide as Menu } from 'react-burger-menu'

function App() {
  return (
    <div className="App">
      <Menu/>
      <header className="App-header">
        <div className="no-wrap">
          <h1>
            wynne the pooh
          </h1>
          <h2>
            NOT WAYNE
          </h2>
        </div>
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
        <img src={logo} className="App-logo" alt="logo" />
        
      </header>
    </div>
  );
}

class Example extends React.Component {
  showSettings (event) {
    event.preventDefault();
  }
 
  render () {
    return (
      <Menu>
        <a id="home" className="menu-item" href="/">Home</a>
        <a id="about" className="menu-item" href="/about">About</a>
        <a id="contact" className="menu-item" href="/contact">Contact</a>
        <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a>
      </Menu>
    );
  }
}

export default App;
