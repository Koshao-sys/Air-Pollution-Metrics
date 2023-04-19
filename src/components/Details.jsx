import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, NavLink } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import '../styles/Details.css';
import {
  FaChevronLeft, FaMicrophone, FaCog, FaRegArrowAltCircleRight,
} from 'react-icons/fa';

const Details = () => {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const myValue = searchParams.get('myValue');
  const locations = useSelector((store) => store.location.locations);
  const metrics = useSelector((store) => store.metric.metrics);
  const details = locations.filter((location) => myValue === location.name);
  const newList = details.map((loc) => {
    const { lat, lon } = loc;
    const metric = metrics.find((m) => m.coord.lat === parseFloat(lat.toFixed(4))
      && m.coord.lon === parseFloat(lon.toFixed(4)));
    return { name: loc.name, ...metric };
  });
  const [{ name, list }] = newList;
  const [{ main, components, dt }] = list;
  const { aqi } = main;

  const btnBack = {
    border: 'none', backgroundColor: 'inherit', color: '#fff', padding: 0,
  };

  let airQuality = '';
  if (aqi === 1) {
    airQuality = 'Good';
  } else if (aqi === 2) {
    airQuality = 'Fair';
  } else if (aqi === 3) {
    airQuality = 'Moderate';
  } else if (aqi === 4) {
    airQuality = 'Poor';
  } else {
    airQuality = 'Very Poor';
  }

  return (
    <div>
      <div className="details-main-bar">
        <NavLink to="/">
          <button type="button" aria-label="back" style={btnBack}><FaChevronLeft /></button>
        </NavLink>
        <p style={{ width: '50%', margin: 0 }}>city air-composition</p>
        <FaMicrophone />
        <FaCog />
      </div>
      <div className="details-heading">
        <div />
        <div>
          <h4 style={{ textTransform: 'uppercase', margin: 0 }}>{name}</h4>
          <p style={{ margin: 0 }}>
            dt
            {dt}
          </p>
          <p style={{ margin: 5 }}>
            Air Quality:
            {' '}
            {airQuality}
          </p>
        </div>
      </div>
      <p style={{
        margin: 0, backgroundColor: '#df4782', color: '#fff', padding: 5,
      }}
      >
        CITY/STATE AIR-POLLUTION COMPOSITION
      </p>
      <ul className="composition-container">
        {Object.keys(components).map((key) => {
          const id = uuidv4();
          return (
            <li key={id} className="composition-list">
              <div className="composition-item">
                <p>{key}</p>
                <p>{components[key]}</p>
              </div>
              <FaRegArrowAltCircleRight style={{ paddingRight: 10 }} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default Details;
