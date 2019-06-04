import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import ErrorBoundary from '../ErrorBoundary';
import Main from '../pages/main';

const App = () => (
  <ErrorBoundary>
    <h1>Travel Planner</h1>
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Main} exact />
      </Switch>
    </BrowserRouter>
  </ErrorBoundary>
);

export default App;
