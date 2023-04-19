import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  locations: [],
  isLoading: true,
  error: '',
};

export const fetchLocations = createAsyncThunk('location/fetchLocations', async () => {
  const cities = ['London', 'Moscow', 'Chelsea', 'Berlin', 'Rome', 'Madrid'];
  try {
    const requests = cities.map(async (city) => {
      const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=4039c600924d48653fbb835bff5d1580`;
      const resp = await fetch(url);
      return resp.json();
    });
    const results = await Promise.all(requests);
    const locs = results.flat();
    return locs;
  } catch (error) {
    return error;
  }
});

const locationsReducer = createSlice({
  name: 'location',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(fetchLocations.pending, (state) => ({
      ...state,
      isLoading: true,
    }));
    builder.addCase(fetchLocations.fulfilled, (state, { payload }) => {
      const newPayload = [];
      payload.map((location) => (
        newPayload.push({
          name: location.name,
          lat: location.lat,
          lon: location.lon,
          country: location.country,
          state: location.state,
        })
      ));
      return { ...state, isLoading: false, locations: newPayload };
    });
    builder.addCase(fetchLocations.rejected, (state, { payload }) => ({
      ...state,
      isLoading: false,
      error: payload,
    }));
  },
});

export default locationsReducer.reducer;
