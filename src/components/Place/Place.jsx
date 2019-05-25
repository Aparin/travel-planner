import React from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from '../ErrorBoundary';
import './Place.css';

const Place = (props) => {
  const { id, name, deletePlace } = props;
  return (
    <ErrorBoundary>
      <span key={id}>
        <span className="name">
          { name }
        </span>
        <svg
          onClick={() => deletePlace(id)}
          style={{
            width: '24px', height: '24px', marginBottom: '-6px', marginLeft: '8px', cursor: 'pointer',
          }}
          viewBox="0 0 24 24"
        >
          <path fill="red" dominantBaseline="inherit" d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" />
        </svg>
      </span>
    </ErrorBoundary>
  );
};

Place.propTypes = {
  deletePlace: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default Place;
