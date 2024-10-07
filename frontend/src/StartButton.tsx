import React from 'react';

interface StartButtonProps {
  onStart: () => void;
  disabled?: boolean;
}

const StartButton: React.FC<StartButtonProps> = ({ onStart, disabled = false }) => {
  return (
    <button className="start-button" onClick={onStart} disabled={disabled}>
      Start
    </button>
  );
};

export default StartButton;

