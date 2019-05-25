import React from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from '../ErrorBoundary';
import Place from '../Place';

const PlacesList = ({
  deletePlace, names, keys,
}) => {
  const items = names.map((name, index) => {
    const key = keys[index];
    return <Place key={key} id={key} name={name} deletePlace={deletePlace} />;
  });
  return <ErrorBoundary>{ items }</ErrorBoundary>;
};

PlacesList.propTypes = {
  deletePlace: PropTypes.func.isRequired,
  names: PropTypes.arrayOf(PropTypes.string).isRequired,
  keys: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default PlacesList;
