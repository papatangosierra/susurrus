import React from "react";
import { useState, useEffect } from "react";

interface DialProps {
  value: number;
}

const Dial: React.FC<DialProps> = ({ value }) => {
  const [timerSlice, setTimerSlice] = useState(value);

  function updateTimer(millisecondsRemaining: number) {
    const path = document.getElementById('dial-slice');
    const radius = 45;

     // Calculate the fraction of the hour remaining
    const minutesRemaining = millisecondsRemaining / 60000;
    const fractionRemaining = minutesRemaining / 60;
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
    updateTimer(value);
  }, [value]);

  return (
    <div className="dial">
      <svg className="dial-svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        <circle id="dial-background" cx="50" cy="50" r="45" fill="var(--color-control)" />
        <path id="dial-slice" />
        {[...Array(60)].map((_, i) => {
          const majorRadius = 50;
          const minorRadius = 45;
          const angle = (i / 60) * 2 * Math.PI;
          const x1 = 50 + 45 * Math.sin(angle);
          const y1 = 50 - 45 * Math.cos(angle);
          const x2 = 50 + 49 * Math.sin(angle);
          const y2 = 50 - 49 * Math.cos(angle);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="var(--color-text)"
              strokeWidth={i % 5 === 0 ? 1.5 : 0.5} // Thicker lines for hour marks
            />
          );
        })}        
        {/* Add digits around the dial */}
        {[...Array(12)].map((_, i) => {
          const angle = (i / 12) * 2 * Math.PI;
          const x = 50 + 55 * Math.sin(angle);
          const y = 51 - 55 * Math.cos(angle);
          return (
            <text
              key={i}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="var(--color-text)"
            >
              {i * 5}
            </text>
          );
        })}
      </svg>
    </div>
  );
};

export default Dial;
