import React from "react";

interface StartButtonProps {
  onStart: () => void;
  disabled?: boolean;
}

const StartButton: React.FC<StartButtonProps> = ({
  onStart,
  disabled = false,
}) => {
  const handleClick = () => {
    if (!disabled) {
      onStart();
    }
  };

  return (
    <div className="start-button-container">
      <button className="start-button" onClick={handleClick} disabled={disabled}>
      Start
    </button>
    </div>
  );
};

export default StartButton;
