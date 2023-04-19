import { configureStore } from '@reduxjs/toolkit';
import locationsReducer from './redux/locations/locationsReducer';
import metricsReducer from './redux/locations/metricsReducer';

const store = configureStore({
  reducer: {
    location: locationsReducer,
    metric: metricsReducer,
  },
});

export default store;
