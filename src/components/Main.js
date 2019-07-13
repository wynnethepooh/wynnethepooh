import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import About from './About'
import Contact from './Contact'

// The Main component renders one of the three provided
// Routes (provided that one matches). The / route will only match
// when the pathname is exactly the string "/"
class Main extends React.Component {
  render() {
    return (
      <main>
        <div className="app-title-header no-wrap">
          <div id="app-title">
            wynne the pooh
          </div>
          <h2>
            NOT WAYNE
          </h2>
        </div>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/about' component={About}/>
          <Route path='/contact' component={Contact}/>
        </Switch>
      </main>
    );
  }
}

export default Main