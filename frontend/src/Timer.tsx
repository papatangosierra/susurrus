import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

const Timer: React.FC = ( { duration } ) => {
  const minutes = Math.floor(duration / 60000);
  const seconds = Math.floor((duration % 60000) / 1000);
  return (
    <div>
      <h1>Time Remaining</h1>
      <div id="countdown">
        <span id="countdown-minutes"> {minutes} </span>:<span id="countdown-seconds"> {seconds} </span>
      </div>
    </div>
  );
};

export default Timer;
