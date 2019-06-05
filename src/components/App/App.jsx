import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import ErrorBoundary from '../ErrorBoundary';
import Main from '../pages/Main';
import Help from '../pages/Help';

const App = () => (
  <ErrorBoundary>
    <h1>Travel Planner</h1>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Help} />
        <Route path="/main" component={Main} />
      </Switch>
    </BrowserRouter>
  </ErrorBoundary>
);

export default App;
