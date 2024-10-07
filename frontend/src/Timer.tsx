import React, { useEffect, useState } from 'react';
import StartButton from './StartButton';

interface TimerProps {
  initialTime: number;
  isRunning: boolean;
}

const Timer: React.FC<TimerProps> = ( { initialTime, isRunning } ) => {
  const [remainingTime, setRemainingTime] = useState(initialTime);
  const [isTimerRunning, setIsTimerRunning] = useState(isRunning);

  useEffect(() => {
    let intervalId: number | undefined;

    if (isTimerRunning && remainingTime > 0) {
      intervalId = window.setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 1000) {
            clearInterval(intervalId);
            setIsTimerRunning(false);
            return 0;
          }
          return prevTime - 1000;
        });
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isTimerRunning, remainingTime]);

  const handleStart = () => {
    setIsTimerRunning(true);
    // Add any other logic needed to start the timer
  };
  const minutes = Math.floor(remainingTime / 60000);
  const seconds = Math.floor((remainingTime % 60000) / 1000);

  // pad seconds with 0 if less than 10
  const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return (
    <div className="remaining-time-display">
      <h2>Time Remaining:</h2>
      <div id="countdown">
        <span id="countdown-minutes"> {minutes} </span>:<span id="countdown-seconds"> {paddedSeconds} </span>
      </div>
      <StartButton onStart={handleStart} disabled={isTimerRunning} />
    </div>
  );
};

export default Timer;
