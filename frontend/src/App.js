import React, { Component } from 'react';
import './css/style.min.css';
import { UserLogin } from './components/Login/UserLogIn.Component'


class App extends Component {
 
  render() {
   
    return (
      <div>
 
        <UserLogin />

      </div>
    );
  }
}

export default App;
