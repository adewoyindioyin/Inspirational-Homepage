import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchImages } from './features/images/imageSlice';
import { fetchWeather } from './features/weather/weatherSlice';
import { fetchQuote } from './features/quotes/quoteSlice';
import BackgroundImage from './components/BackgroundImage';
import Weather from './components/Weather';
import Quote from './components/Quote';
import Goals from './components/Goals';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchImages());
    dispatch(fetchWeather());
    dispatch(fetchQuote());
  }, [dispatch]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'Good morning';
    if (hour >= 12 && hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-gray-900 overflow-hidden">
      <BackgroundImage />

      <div className="relative z-10 w-full h-full min-h-screen flex flex-col p-6 pointer-events-none">
        {/* Top bar for Weather */}
        <header className="w-full flex justify-end">
          <div className="pointer-events-auto">
            <Weather />
          </div>
        </header>

        {/* Center content for Greeting / Quote */}
        <main className="flex-1 flex flex-col items-center justify-center text-center">
           <h1 className="text-6xl font-bold text-shadow-lg mb-8 tracking-tight pointer-events-auto">{getGreeting()}.</h1>
           <div className="pointer-events-auto">
             <Quote />
           </div>
        </main>

        {/* Bottom area for Goals */}
        <footer className="w-full flex justify-center pb-8">
          <div className="pointer-events-auto w-full max-w-md">
            <Goals />
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
