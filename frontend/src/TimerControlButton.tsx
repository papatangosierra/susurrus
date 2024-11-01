import React from "react";

interface TimerControlButtonProps {
  isRunning: boolean;
  onStart: () => void;
  onReset: () => void;
  disabled?: boolean;
}

const TimerControlButton: React.FC<TimerControlButtonProps> = ({
  isRunning,
  onStart,
  onReset,
  disabled = false,
}) => {
  const handleClick = () => {
    if (!disabled) {
      isRunning ? onReset() : onStart();
    }
  };

  return (
    <button 
      className={isRunning ? "reset-button" : "start-button"} 
      onClick={handleClick} 
      disabled={disabled}
    >
      {isRunning ? "Reset" : "Start"}
    </button>
  );
};

export default TimerControlButton; 