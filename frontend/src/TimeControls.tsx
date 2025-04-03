import React from 'react';

interface TimeControlsProps {
  minutes: number;
  seconds: number;
  tenths: number;
  isOwner: boolean;
  isRunning: boolean;
  onIncrementMinutes: (() => void) | undefined;
  onDecrementMinutes: (() => void) | undefined;
  onIncrementSeconds: (() => void) | undefined;
  onDecrementSeconds: (() => void) | undefined;
}

export const TimeControls: React.FC<TimeControlsProps> = ({
  minutes,
  seconds,
  tenths,
  isOwner,
  isRunning,
  onIncrementMinutes,
  onDecrementMinutes,
  onIncrementSeconds,
  onDecrementSeconds,
}) => {
  const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  const paddedTenths = `0${tenths}`;

  return (
    <div className="countdown">
      <div className="time-control">
        {!isRunning && onIncrementMinutes && <button onClick={onIncrementMinutes}>▲</button>}
        <div id="countdown-minutes">{minutes}</div>
        {!isRunning && onDecrementMinutes && <button onClick={onDecrementMinutes}>▼</button>}
      </div>
      <div id="countdown-separator">:</div>
      <div className="time-control">
        {!isRunning && onIncrementSeconds && <button onClick={onIncrementSeconds}>▲</button>}
        <div id="countdown-seconds">{paddedSeconds}</div>
        {!isRunning && onDecrementSeconds && <button onClick={onDecrementSeconds}>▼</button>}
      </div>
      <div id="countdown-tenths">{paddedTenths}</div>
    </div>
  );
};

export default TimeControls;