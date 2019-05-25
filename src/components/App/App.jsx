import React, { Component } from 'react';
import './App.css';
import ErrorBoundary from '../ErrorBoundary';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <ErrorBoundary>
        <h1>Travel Planner</h1>
      </ErrorBoundary>
    );
  }
}

export default App;
