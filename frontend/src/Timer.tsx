import React, { useEffect, useState } from "react";
import StartButton from "./StartButton";
import Dial from "./Dial";

interface TimerProps {
  duration: number;
  startTime: number;
}

const Timer: React.FC<TimerProps> = ({ duration, startTime }) => {
  const [theRemainingTime, setTheRemainingTime] = useState(duration);
  const [theStartTime, setTheStartTime] = useState(startTime);

  useEffect(() => {
    let intervalId: number | undefined;

    // if theStartTime is greater than 0, that means the timer is running.
    // so we need to update the remaining time every second.
    if (theStartTime > 0) {
      intervalId = window.setInterval(() => {
        setTheRemainingTime(duration - (Date.now() - theStartTime));
      }, 100);
    }

    // if the remaining time is less than or equal to 0,
    // reset the timer.
    if (theRemainingTime <= 0) {
      clearInterval(intervalId);
      setTheRemainingTime(duration);
      setTheStartTime(0);
    }

    return () => clearInterval(intervalId);
  }, [theRemainingTime, theStartTime]);

  const handleStart = () => {
    // start the timer 1 second in the future so that we don't skip the first tick
    setTheStartTime(Date.now() + 10);
  };

  const minutes = Math.floor(theRemainingTime / 60000);
  const seconds = Math.floor((theRemainingTime % 60000) / 1000);
  const tenths = Math.floor((theRemainingTime % 1000) / 100);

  // pad seconds with 0 if less than 10
  const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  const paddedTenths = tenths < 10 ? `0${tenths}` : tenths;

  return (
    <div className="remaining-time-display">
      <h2>Time Remaining</h2>
      <Dial value={theRemainingTime / duration} />
      <div className="countdown">
        <span id="countdown-minutes">{minutes}</span>:
        <span id="countdown-seconds">{paddedSeconds}</span>:
        <span id="countdown-tenths">{paddedTenths}</span>
      </div>
      <StartButton onStart={handleStart} disabled={theStartTime > 0} />
    </div>
  );
};

export default Timer;
