import React from "react";
import { useState, useEffect, useCallback } from "react";
import DialRemainingSlice from "./DialRemainingSlice";
import DialDigits from "./DialDigits";
import DialUsers from "./DialUsers";
import { UserInterface } from "../../src/Classes/userInterface";

interface DialProps {
  value: number;
  isOwner: boolean;
  thisUser: UserInterface | null;
  users: UserInterface[];
  owner: UserInterface;
  isRunning: boolean;
  onValueChange?: (newValue: number) => void;
}

const Dial: React.FC<DialProps> = ({ value, thisUser, users, owner, isOwner, isRunning, onValueChange }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [lastAngle, setLastAngle] = useState(0);
  const [temporaryValue, setTemporaryValue] = useState(value);

  // Reset temporary value when actual value changes
  useEffect(() => {
    setTemporaryValue(value);
  }, [value]);

  const normalizeAngle = useCallback((angle: number): number => {
    // Convert angle to be between 0 and 2π
    while (angle < 0) angle += 2 * Math.PI;
    while (angle >= 2 * Math.PI) angle -= 2 * Math.PI;
    return angle;
  }, []);

  const getAngleFromEvent = useCallback((event: MouseEvent | TouchEvent) => {
    const dialElement = document.querySelector('.dial-svg');
    if (!dialElement) return 0;

    const rect = dialElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;

    return normalizeAngle(Math.atan2(clientY - centerY, clientX - centerX));
  }, [normalizeAngle]);

  const handleDragStart = useCallback((event: React.MouseEvent | React.TouchEvent) => {
    if (!isOwner || isRunning) return;
    
    event.preventDefault();
    setIsDragging(true);
    setLastAngle(getAngleFromEvent(event.nativeEvent));
  }, [isOwner, isRunning, getAngleFromEvent]);

  const handleDragMove = useCallback((event: MouseEvent | TouchEvent) => {
    if (!isDragging) return;

    const currentAngle = getAngleFromEvent(event);
    let angleDiff = currentAngle - lastAngle;

    // Handle crossing between quadrants 4 and 1
    if (Math.abs(angleDiff) > Math.PI) {
      // If the difference is greater than π, we've crossed the boundary
      if (angleDiff > 0) {
        angleDiff -= 2 * Math.PI;
      } else {
        angleDiff += 2 * Math.PI;
      }
    }
    
    // Convert angle difference to minutes (60 minutes = full rotation)
    const minutesDiff = (angleDiff * 60) / (2 * Math.PI);
    const valueDiff = minutesDiff * 60000; // Convert to milliseconds

    // Update the temporary value without quantizing
    setTemporaryValue(prev => Math.max(0, prev + valueDiff));
    setLastAngle(currentAngle);
  }, [isDragging, lastAngle, getAngleFromEvent]);

  const handleDragEnd = useCallback(() => {
    if (isDragging && onValueChange) {
      // Quantize to nearest minute only when sending the final value
      const quantizedValue = Math.round(temporaryValue / 60000) * 60000;
      onValueChange(quantizedValue);
    }
    setIsDragging(false);
  }, [isDragging, temporaryValue, onValueChange]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleDragMove);
      window.addEventListener('mouseup', handleDragEnd);
      window.addEventListener('touchmove', handleDragMove);
      window.addEventListener('touchend', handleDragEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleDragMove);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchmove', handleDragMove);
      window.removeEventListener('touchend', handleDragEnd);
    };
  }, [isDragging, handleDragMove, handleDragEnd]);

  return (
    <div className="dial">
      <svg 
        className="dial-svg" 
        viewBox="0 0 100 100" 
        preserveAspectRatio="xMidYMid meet"
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
        style={{ cursor: (isOwner && !isRunning) ? 'grab' : 'default' }}
      >
        <circle id="dial-background" cx="50" cy="50" r="45" fill="var(--color-control)" />
        <DialRemainingSlice value={isDragging ? temporaryValue : value} />
        <DialDigits />
      </svg>
      <DialUsers value={isDragging ? temporaryValue : value} users={users} thisUser={thisUser} owner={owner} />
    </div>
  );
};

export default Dial;
