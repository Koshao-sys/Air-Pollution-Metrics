import React from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import {
  FaChevronLeft, FaMicrophone, FaCog,
} from 'react-icons/fa';
import LoadHomeScreen from './LoadHomeScreen';
import '../styles/Home.css';
import '../styles/Details.css';

const Home = () => {
  const data = useSelector((store) => store.location);
  const { locations } = data;

  const headStyle = {
    margin: 0,
    backgroundColor: '#df4782',
    color: '#fff',
    padding: 5,
  };

  return (
    <div>
      <div className="details-main-bar">
        <FaChevronLeft />
        <p style={{ width: '50%', margin: 0, textAlign: 'center' }}>major cities</p>
        <FaMicrophone />
        <FaCog />
      </div>
      <div className="details-heading">
        <div className="europe-img" />
        <div>
          <h2 style={{ textTransform: 'uppercase', margin: 0 }}>EUROPE</h2>
          <p style={{ margin: 0 }}>
            {locations.length}
            {' '}
            Cities
          </p>
        </div>
      </div>
      <p style={headStyle}>
        COORDINATES BY CITY
      </p>
      <ul className="locations-container">
        {locations.map((location) => {
          const id = uuidv4();
          return <LoadHomeScreen key={id} item={location} />;
        })}
      </ul>
    </div>
  );
};

export default Home;
