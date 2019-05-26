import React from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from '../ErrorBoundary';
import Place from '../Place';
import DndConteiner from '../../containers/DndConteiner';

const PlacesList = ({
  deletePlace, names, keys,
}) => {
  const nameItems = names.map((name, index) => {
    const key = keys[index];
    const item = <Place key={key} id={key} name={name} deletePlace={deletePlace} />;
    return ({ id: key, contents: item });
  });
  return (
    <ErrorBoundary>
      <DndConteiner
        nameItems={nameItems}
        names={names}
        keys={keys}
      />
    </ErrorBoundary>
  );
};

PlacesList.propTypes = {
  deletePlace: PropTypes.func.isRequired,
  names: PropTypes.arrayOf(PropTypes.string).isRequired,
  keys: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default PlacesList;
