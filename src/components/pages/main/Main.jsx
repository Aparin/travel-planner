/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import './Main.css';
import ErrorBoundary from '../../ErrorBoundary';
import InputPlaceName from '../../InputPlaceName';
import PlaceList from '../../PlaceList';
import Map from '../../Map';
import yaMap from '../../../services/yaMap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      names: [],
      keys: [],
      lastKey: 1,
      showNameList: false,
      startCoord: [55.76, 37.64],
      isErrMess: false,
    };
  }

  addPoint = (name) => {
    const newNames = this.state.names;
    newNames.push(name);

    const newKeys = this.state.keys;
    newKeys.push(this.state.lastKey);

    const { lastKey } = this.state;
    yaMap.addGeoObject(
      name,
      lastKey,
    );

    this.setState(() => ({
      names: newNames,
      lastKey: lastKey + 1,
      keys: newKeys,
      showNameList: true,
    }));
  }

  deletePlace = (key) => {
    const { names } = this.state;
    const newNames = names.filter((name, index) => {
      if (this.state.keys[index] !== key) return name;
      return undefined;
    });

    const { keys } = this.state;
    const newKeys = keys.filter((k) => {
      if (k !== key) return key;
      return undefined;
    });

    this.setState({
      keys: newKeys,
      names: newNames,
    });

    yaMap.deleteGeoObject(key);
  }

  onError = () => {
    this.setState({ isErrMess: true });
  }

  render() {
    const { showNameList } = this.state;
    return (
      <ErrorBoundary>
        { this.state.isErrMess
        && <div id="msg">Ошибка доступа к серверу Яндекс-Карт. Проверьте соединение с интернетом и перезагрузите страницу</div>
        }

        <div id="leftGroup">
          <Link to="/">
            <Button
              variant="outlined"
              color="primary"
              style={{ marginLeft: '100px', marginBottom: '20px' }}
            >
            Как пользоваться
            </Button>
          </Link>
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
        <Map center={this.state.startCoord} onError={this.onError} />
      </ErrorBoundary>
    );
  }
}

export default App;
