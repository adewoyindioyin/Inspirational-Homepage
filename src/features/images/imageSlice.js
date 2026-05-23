import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchImages = createAsyncThunk(
  'image/fetchImages',
  async () => {
    const apiKey = import.meta.env.VITE_UNSPLASH_API_KEY;
    const response = await fetch(`https://api.unsplash.com/photos/random?query=nature,landscape&orientation=landscape&count=5&client_id=${apiKey}`);
    if (!response.ok) {
      throw new Error('Failed to fetch images');
    }
    const data = await response.json();
    return data.map(img => img.urls.full);
  }
);

const mockImages = [
  'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1506744626753-143683923be2?q=80&w=2000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=2000&auto=format&fit=crop'
];

const initialState = {
  images: mockImages,
  currentIndex: 0,
  status: 'idle',
  error: null,
};

export const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    nextImage: (state) => {
      state.currentIndex = (state.currentIndex + 1) % state.images.length;
    },
    prevImage: (state) => {
      state.currentIndex = state.currentIndex === 0 
        ? state.images.length - 1 
        : state.currentIndex - 1;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchImages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.images = action.payload;
        state.currentIndex = 0;
      })
      .addCase(fetchImages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { nextImage, prevImage } = imageSlice.actions;
export default imageSlice.reducer;
