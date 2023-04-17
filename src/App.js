import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Home from './components/Home';
import { fetchLocations } from './redux/locations/locationsReducer';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchLocations());
  }, [dispatch]);

  return (
    <>
      <Home />
    </>
  );
};

export default App;
