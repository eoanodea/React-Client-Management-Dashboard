import React, { Component } from 'react';
import './css/style.min.css';

import { AppNavbar } from './components/AppNavbar.Component';
import { UserLogin } from './components/Login/UserLogIn.Component'
import { Dashboard } from './components/Dashboard.Component';

class App extends Component {
 
  render() {
   
    return (
      <div>
        <AppNavbar />
        <UserLogin />
        <Dashboard />
      </div>
    );
  }
}

export default App;