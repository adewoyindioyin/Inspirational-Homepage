import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchQuote = createAsyncThunk(
  'quote/fetchQuote',
  async () => {
    try {
      const response = await fetch('https://api.quotable.io/random');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return {
        content: data.content,
        author: data.author
      };
    } catch (error) {
      // Fallback API if quotable is down
      const fallbackResponse = await fetch('https://dummyjson.com/quotes/random');
      const fallbackData = await fallbackResponse.json();
      return {
        content: fallbackData.quote,
        author: fallbackData.author
      };
    }
  }
);

const initialState = {
  data: {
    content: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  status: 'idle',
  error: null,
};

export const quoteSlice = createSlice({
  name: 'quote',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuote.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchQuote.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchQuote.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default quoteSlice.reducer;
