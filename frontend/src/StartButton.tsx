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
    <button className="start-button" onClick={handleClick} disabled={disabled}>
      Start
    </button>
  );
};

export default StartButton;
