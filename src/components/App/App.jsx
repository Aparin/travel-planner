/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import './App.css';
import ErrorBoundary from '../ErrorBoundary';
import InputPlaceName from '../InputPlaceName';
import Place from '../Place';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      names: [],
    };
  }

  addPoint = (name) => {
    const newNames = this.state.names;
    newNames.push(name);

    this.setState({
      names: newNames,
    });
  }

  render() {
    return (
      <ErrorBoundary>
        <h1>Travel Planner</h1>
        <InputPlaceName addPoint={this.addPoint} />
        <Place id={1} name="name" deletePlace={() => {}} />
      </ErrorBoundary>
    );
  }
}

export default App;
