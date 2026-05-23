import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from '../features/weather/weatherSlice';
import quoteReducer from '../features/quotes/quoteSlice';
import imageReducer from '../features/images/imageSlice';
import goalsReducer from '../features/goals/goalsSlice';

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    quote: quoteReducer,
    image: imageReducer,
    goals: goalsReducer,
  },
});
