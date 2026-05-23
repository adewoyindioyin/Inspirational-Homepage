import React from 'react';
import { useSelector } from 'react-redux';

const Quote = () => {
  const { data } = useSelector((state) => state.quote);

  return (
    <div className="max-w-2xl text-shadow-md">
      <p className="text-xl font-medium mb-2">"{data.content}"</p>
      <p className="text-sm opacity-80 uppercase tracking-widest">— {data.author}</p>
    </div>
  );
};

export default Quote;
