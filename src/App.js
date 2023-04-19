import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './styles/spinner.css';
import { fetchLocations } from './redux/locations/locationsReducer';
import { fetchMetrics } from './redux/locations/metricsReducer';
import Home from './components/Home';
import Details from './components/Details';

const App = () => {
  const { isLoading } = useSelector((store) => store.metric);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchLocations());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchMetrics());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="spinner-container">
        <div className="loading-spinner" />
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/metrics" element={<Details />} />
      </Routes>
    </>
  );
};

export default App;
