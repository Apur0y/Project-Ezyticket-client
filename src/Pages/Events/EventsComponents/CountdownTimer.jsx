// src/components/CountdownTimer.jsx
import React from 'react';

const CountdownTimer = ({ timeLeft, darkMode }) => (
  <div className="flex justify-center gap-4 md:gap-2 text-white">
    {Object.entries(timeLeft).map(([unit, value]) => (
      <div
        key={unit}
        className={`flex flex-col items-center ${
          darkMode
            ? "bg-green-800 text-dark-primary"
            : "bg-green-600 text-white"
        } py-1 lg:py-2 px-3 lg:px-5 font-semibold rounded`}
      >
        <span className="text-3xl md:text-3xl font-bold">
          {String(value).padStart(2, "0")}
        </span>
        <span className="text-sm uppercase tracking-wider">{unit}</span>
      </div>
    ))}
  </div>
);

export default CountdownTimer;
