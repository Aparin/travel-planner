import React, { useState } from 'react';
import './InputPlaceName.css';
import PropTypes from 'prop-types';
import ErrorBoundary from '../ErrorBoundary';

const InputPlaceName = ({ addPoint }) => {
  const [state, setState] = useState({ value: '' });

  const nameToState = (e) => {
    if (e.keyCode !== 13 || e.target.value === '') return;

    addPoint(state.value);
    setState({ value: '' });
  };

  const onChange = (e) => {
    setState({
      value: e.target.value,
    });
  };

  return (
    <ErrorBoundary>
      <input
        type="text"
        className="input"
        id="NewPlaceName"
        placeholder={"Введите название места и нажмите 'Enter'"}
        onChange={onChange}
        onKeyUp={nameToState}
        value={state.value}
      />
    </ErrorBoundary>
  );
};

InputPlaceName.propTypes = {
  addPoint: PropTypes.func.isRequired,
};

export default InputPlaceName;
