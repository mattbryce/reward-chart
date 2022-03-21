import React, { Component } from 'react';
import './App.css';
import GetLocalPosts from './components/LocalData/GetLocalData';
import GetOnlineData from './components/OnlineData/GetOnlineData';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* Uncomment below to use local data */}
        {/* <h1 className="header">Local Reward Status (Read-Only)</h1>
        <GetLocalPosts/> */}
        <h1 className="header">Reward Status</h1>
        <GetOnlineData/>
      </div>
    );
  }
}

export default App;