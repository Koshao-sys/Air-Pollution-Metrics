import { configureStore } from '@reduxjs/toolkit';
import locationsReducer from './redux/locations/locationsReducer';

const store = configureStore({
  reducer: {
    location: locationsReducer,
  },
});

export default store;
