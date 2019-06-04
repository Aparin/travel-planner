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
        <Route path="/apps/travel-planner/" component={Main} exact />
        <Route path="/apps/travel-planner/help" component={Help} />
      </Switch>
    </BrowserRouter>
  </ErrorBoundary>
);

export default App;
