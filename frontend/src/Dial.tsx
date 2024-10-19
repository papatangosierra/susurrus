import React from "react";

interface DialProps {
  value: number;
  onChange: (value: number) => void;
}

const Dial: React.FC<DialProps> = ({ value, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);
    if (!isNaN(newValue)) {
      onChange(newValue);
    }
  };

  return (
    <div className="dial">
      <svg className="dial-svg">
        <circle cx="50%" cy="50%" r="10vh" fill="transparent" stroke="black" strokeWidth="2" />
      </svg>
    </div>
  );
};

export default Dial;