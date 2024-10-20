import React, { useState, useEffect, useRef } from "react";

interface UserProps {
  id: string;
  name: string;
  isThisUser: boolean;
  isOwner: boolean;
}

const User: React.FC<UserProps> = ({ id, name, isThisUser, isOwner }) => {
  const [position, setPosition] = useState({
    x: Math.random() * (window.innerWidth * 0.9),
    y: Math.random() * (window.innerHeight * 0.9),
  });
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const wanderIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    startWandering();

    return () => {
      if (wanderIntervalRef.current) {
        clearInterval(wanderIntervalRef.current);
      }
    };
  }, []);

  const startWandering = () => {
    if (wanderIntervalRef.current) {
      clearInterval(wanderIntervalRef.current);
    }

    wanderIntervalRef.current = setInterval(() => {
      if (!isDragging) {
        setPosition((prevPos) => ({
          x: Math.max(0, Math.min(window.innerWidth * 0.9, prevPos.x + (Math.random() - 0.5) * 10)),
          y: Math.max(0, Math.min(window.innerHeight * 0.9, prevPos.y + (Math.random() - 0.5) * 10)),
        }));
      }
    }, 200);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    if (wanderIntervalRef.current) {
      clearInterval(wanderIntervalRef.current);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.current.x,
        y: e.clientY - dragOffset.current.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    startWandering();
  };

  return (
    <div
      className={`user-container ${isThisUser ? "this-user" : ""} ${isOwner ? "owner" : ""}`}
      style={{
        position: "absolute",
        top: position.y,
        left: position.x,
        transition: isDragging ? "none" : "all 0.2s linear",
        cursor: isDragging ? "grabbing" : "grab",
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {name}
    </div>
  );
};

export default User;
