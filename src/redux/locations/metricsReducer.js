import { createSlice, createAsyncThunk } from '@reduxjs/toolkit/dist';
import axios from 'axios';

const initialState = {
  metrics: [],
  isLoading: true,
};

export const fetchMetrics = createAsyncThunk('location/fetchMetrics', async (locs, thunkAPI) => {
  try {
    const requests = locs.map(async (coordinate) => {
      const url = `http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${coordinate.lat}&lon=${coordinate.lon}&appid=4039c600924d48653fbb835bff5d1580`;
      const resp = await axios(url);
      return resp.data;
    });
    const results = await Promise.all(requests);
    const coords = results.flat();
    return coords;
  } catch (error) {
    return thunkAPI.rejectWithValue('There was an error...');
  }
});

const metricsReducer = createSlice({
  name: 'metric',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchMetrics.pending, (state) => ({
      ...state,
      isLoading: true,
    }));
    builder.addCase(fetchMetrics.fulfilled, (state, { payload }) => ({
      ...state,
      isLoading: false,
      metrics: payload,
    }));
    builder.addCase(fetchMetrics.rejected, (state, { payload }) => ({
      ...state,
      error: payload,
      isLoading: false,
    }));
  },
});

export default metricsReducer.reducer;
