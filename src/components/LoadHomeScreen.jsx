import React from 'react';
import PropTypes from 'prop-types';
import { FaRegArrowAltCircleRight } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const LoadHomeScreen = ({ item }) => {
  const {
    name, lon, lat, country,
  } = item;
  return (
    <li className="location-item">
      <div className="next-page">
        <NavLink to={`/metrics?myValue=${name}`}>
          <button type="button" aria-label="next-page" style={{ border: 0, backgroundColor: 'inherit', color: '#fff' }}><FaRegArrowAltCircleRight /></button>
        </NavLink>
      </div>
      <div className="location-cordinates">
        <h4 style={{ margin: 0, textTransform: 'uppercase' }}>
          {name}
          {' '}
          {country}
        </h4>
        <p style={{ margin: 0 }}>
          Lon:
          {lon}
        </p>
        <p style={{ margin: 0 }}>
          Lat:
          {lat}
        </p>
      </div>
    </li>
  );
};

LoadHomeScreen.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    lon: PropTypes.number,
    lat: PropTypes.number,
    country: PropTypes.string,
  }).isRequired,
};

export default LoadHomeScreen;
