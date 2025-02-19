import React from 'react';

interface TimeControlsProps {
  minutes: number;
  seconds: number;
  tenths: number;
  isOwner: boolean;
  isRunning: boolean;
  onIncrementMinutes: () => void;
  onDecrementMinutes: () => void;
  onIncrementSeconds: () => void;
  onDecrementSeconds: () => void;
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
        {isOwner && !isRunning && <button onClick={onIncrementMinutes}>▲</button>}
        <div id="countdown-minutes">{minutes}</div>
        {isOwner && !isRunning && <button onClick={onDecrementMinutes}>▼</button>}
      </div>
      <div id="countdown-separator">:</div>
      <div className="time-control">
        {isOwner && !isRunning && <button onClick={onIncrementSeconds}>▲</button>}
        <div id="countdown-seconds">{paddedSeconds}</div>
        {isOwner && !isRunning && <button onClick={onDecrementSeconds}>▼</button>}
      </div>
      <div id="countdown-tenths">{paddedTenths}</div>
    </div>
  );
};

export default TimeControls;