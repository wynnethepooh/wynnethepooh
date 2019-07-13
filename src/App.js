import React from 'react';
import logo from './logo.svg';
import { Link } from 'react-router-dom';
import './App.css';
import Main from './components/Main';
import { slide as Menu } from 'react-burger-menu'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Menu>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </Menu>
        <Main />
      </div>
    );
  }
}

export default App;
