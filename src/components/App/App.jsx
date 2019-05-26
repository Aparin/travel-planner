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
      names: [],
      keys: [],
      lastKey: 1,
      showNameList: false,
    };
  }

  addPoint = (name) => {
    const newNames = this.state.names;
    newNames.push(name);

    const newKeys = this.state.keys;
    newKeys.push(this.state.lastKey);

    this.setState(() => {
      const { lastKey } = this.state;
      return {
        names: newNames,
        lastKey: lastKey + 1,
        keys: newKeys,
        showNameList: true,
      };
    });
  }

  deletePlace = () => {};

  render() {
    const { showNameList } = this.state;
    return (
      <ErrorBoundary>
        <h1>Travel Planner</h1>
        <div id="leftGroup">
          <InputPlaceName addPoint={this.addPoint} />
          {
            showNameList
              && (
              <PlaceList
                deletePlace={this.deletePlace}
                names={this.state.names}
                keys={this.state.keys}
              />
              )
          }
        </div>

      </ErrorBoundary>
    );
  }
}

export default App;
