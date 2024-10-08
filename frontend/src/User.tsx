import React, { useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
}

const User: React.FC<User> = ({ id, name }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Initial random position
    setPosition({
      x: Math.random() * (window.innerWidth * 0.9),
      y: Math.random() * (window.innerHeight * 0.9),
    });

    // Set up interval for wandering movement
    const wanderInterval = setInterval(() => {
      setPosition(prevPos => ({
        x: Math.max(0, Math.min(window.innerWidth * 0.9, prevPos.x + (Math.random() - 0.5) * 25)),
        y: Math.max(0, Math.min(window.innerHeight * 0.9, prevPos.y + (Math.random() - 0.5) * 25)),
      }));
    }, 300); // Move every 2 seconds

    // Clean up interval on component unmount
    return () => clearInterval(wanderInterval);
  }, []);

  return (
    <li 
      className="user-container" 
      style={{
        position: "absolute",
        top: position.y,
        left: position.x,
        transition: "all .3s linear",
      }}
    >
      {name}
    </li>
  );
};

export default User;