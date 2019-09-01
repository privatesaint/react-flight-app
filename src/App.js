import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import './App.css';

function App() {
  return (
    <Switch>
      <Route exact path='/' component={Login} />
      <Route exact path='/dashboard' component={Home} />
    </Switch>
  );
}

export default App;
