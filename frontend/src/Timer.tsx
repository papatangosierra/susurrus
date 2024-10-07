import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

const Timer: React.FC = () => {
  const [duration, setDuration] = useState(0);
  return (
    <div>
      <h1>Timer</h1>
      <div id="countdown">
        <span id="countdown-minutes">00</span>:<span id="countdown-seconds">00</span>
      </div>
    </div>
  );
};
