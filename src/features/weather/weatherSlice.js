import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Default to a specific city if geolocation fails or isn't used
const DEFAULT_CITY = 'New York';

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (city = DEFAULT_CITY) => {
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`);
    if (!response.ok) {
      throw new Error('Failed to fetch weather');
    }
    const data = await response.json();
    return {
      temp: data.main.temp,
      description: data.weather[0].main,
      icon: data.weather[0].icon,
      city: data.name
    };
  }
);

const initialState = {
  data: {
    temp: 72,
    description: 'Sunny',
    icon: '01d',
    city: 'San Francisco'
  },
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default weatherSlice.reducer;
