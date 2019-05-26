import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from '../ErrorBoundary';

class Map extends Component {
  constructor(props) {
    super(props);
    this.map = createRef(null);
    this.center = props.center;
    this.onError = props.onError;
  }

  componentDidMount() {

  }

  render() {
    return (
      <ErrorBoundary>
        <div ref={this.map} style={{ width: '800px', height: '500px', display: 'inline-block' }} />
      </ErrorBoundary>
    );
  }
}

Map.propTypes = {
  center: PropTypes.arrayOf(PropTypes.number).isRequired,
  onError: PropTypes.func.isRequired,
};

export default Map;
