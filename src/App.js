import React from 'react';
import './App.css';
import RouterComponent from './router/RouterComponent';

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";

class App extends React.Component {
  render() {
    return (
      <RouterComponent/>
    )
  }
}

export default App;
