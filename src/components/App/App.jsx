/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import './App.css';
import ErrorBoundary from '../ErrorBoundary';
import InputPlaceName from '../InputPlaceName';
import PlaceList from '../PlaceList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      names: ['1', '2'],
      keys: [1, 2],
    };
  }

  addPoint = (name) => {
    const newNames = this.state.names;
    newNames.push(name);

    this.setState({
      names: newNames,
    });
  }

  deletePlace = () => {};

  render() {
    return (
      <ErrorBoundary>
        <h1>Travel Planner</h1>
        <InputPlaceName addPoint={this.addPoint} />
        <PlaceList
          deletePlace={this.deletePlace}
          names={this.state.names}
          keys={this.state.keys}
        />
      </ErrorBoundary>
    );
  }
}

export default App;
