import React from "react";
/* 
  This component is used to draw the digits around the dial.
  It is used in the Dial component. It takes no props.
*/
const DialDigits: React.FC = () => {
  return (
    <>
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
    </>
  );
};

export default DialDigits;
