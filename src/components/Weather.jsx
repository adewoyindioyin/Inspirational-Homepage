import React from 'react';
import { useSelector } from 'react-redux';

const Weather = () => {
  const { data } = useSelector((state) => state.weather);

  return (
    <div className="glass-panel p-6 flex flex-row items-center justify-between space-x-6 min-w-[250px]">
      <div className="flex flex-col items-start">
        <span className="text-xl font-medium text-shadow-sm">{data.description}</span>
        <span className="text-base opacity-80 mt-1">{data.city}</span>
      </div>
      <span className="text-6xl font-bold text-shadow-md">{Math.round(data.temp)}°</span>
    </div>
  );
};

export default Weather;
