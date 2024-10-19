import React from "react";
import { useState, useEffect } from "react";

interface DialProps {
  value: number;
}

const Dial: React.FC<DialProps> = ({ value }) => {
  const [timerSlice, setTimerSlice] = useState(value);

  function updateTimer(fractionRemaining: number) {
    const path = document.getElementById('timer-slice');
    const radius = 45;
    
    if (fractionRemaining >= 0.9999) {
      // Draw a full circle when the timer is full or nearly full
      path!.setAttribute('d', `M 50 5
                               A 45 45 0 1 1 49.99 5
                               Z`);
    } else {
      const endAngle = 2 * Math.PI * fractionRemaining;
      const x = 50 + radius * Math.sin(endAngle);
      const y = 50 - radius * Math.cos(endAngle);
      
      const largeArcFlag = fractionRemaining > 0.5 ? 1 : 0;
      
      const d = `M 50 50
                 L 50 5
                 A 45 45 0 ${largeArcFlag} 1 ${x} ${y}
                 Z`;
      
      path!.setAttribute('d', d);
    }
  }
  
  useEffect(() => {
    setTimerSlice(value);
    updateTimer(timerSlice);
  }, [value]);

  return (
    <div className="dial">
      <svg className="dial-svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        <path id="timer-slice" fill="orange" />
      </svg>
    </div>
  );
};

export default Dial;
