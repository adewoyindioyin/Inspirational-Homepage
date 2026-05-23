import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nextImage, prevImage } from '../features/images/imageSlice';

const BackgroundImage = () => {
  const dispatch = useDispatch();
  const { images, currentIndex } = useSelector((state) => state.image);

  const currentImageUrl = images[currentIndex];

  return (
    <div 
      className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
      style={{ backgroundImage: `url(${currentImageUrl})` }}
    >
      <div className="absolute inset-0 bg-black/40"></div>
      
      {/* Controls for cycling images */}
      <div className="absolute bottom-6 left-6 z-20 flex space-x-3">
        <button 
          onClick={() => dispatch(prevImage())}
          className="bg-black/30 hover:bg-black/50 text-white backdrop-blur-md rounded-full p-2 transition-colors border border-white/20"
          aria-label="Previous image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          onClick={() => dispatch(nextImage())}
          className="bg-black/30 hover:bg-black/50 text-white backdrop-blur-md rounded-full p-2 transition-colors border border-white/20"
          aria-label="Next image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default BackgroundImage;
