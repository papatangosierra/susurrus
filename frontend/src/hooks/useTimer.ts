import { useState, useEffect, useContext } from 'react';
import WebSocketContext from '../WebSocketContext';
import { AudioService } from '../services/AudioService';

interface UseTimerProps {
  duration: number;
  startTime: number;
  timerId: string;
  isOwner: boolean;
  audioEnabled: boolean;
}

export function useTimer({ duration, startTime, timerId, isOwner, audioEnabled }: UseTimerProps) {
  const [remainingTime, setRemainingTime] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const [editableDuration, setEditableDuration] = useState(duration);
  const webSocket = useContext(WebSocketContext);
  const audioService = AudioService.getInstance();

  useEffect(() => {
    console.log('Effect 1 triggered with:', {
      startTime,
      duration,
      currentTime: Date.now(),
      wouldStart: startTime && startTime + duration > Date.now(),
      elapsedTime: startTime ? Date.now() - startTime : null
    });

    setEditableDuration(duration);
    if (startTime && startTime + duration > Date.now()) {
      setIsRunning(true);
      const elapsedTime = Date.now() - startTime;
      const newRemainingTime = Math.max(0, duration - elapsedTime);
      console.log('Setting remaining time to:', newRemainingTime);
      setRemainingTime(newRemainingTime);
    } else {
      console.log('Timer not running, setting to duration:', duration);
      setIsRunning(false);
      setRemainingTime(duration);
    }
  }, [duration, startTime]);

  useEffect(() => {
    console.log('Effect 2 (countdown) triggered:', { isRunning, remainingTime });
    let intervalId: number | undefined;
    if (isRunning && remainingTime > 0) {
      intervalId = window.setInterval(() => {
        setRemainingTime((prevTime) => {
          const newTime = Math.max(0, prevTime - 100);
          return newTime;
        });
      }, 100);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, remainingTime]);

  const handleStart = () => {
    if (isOwner) {
      webSocket?.send(JSON.stringify({
        type: "START_TIMER",
        payload: { timerId, startTime: Date.now() },
      }));
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setEditableDuration(duration);
    setRemainingTime(duration);
    webSocket?.send(JSON.stringify({
      type: "RESET_TIMER",
      payload: { timerId, duration: editableDuration },
    }));
  };

  const handleDurationChange = (newDuration: number) => {
    setEditableDuration(newDuration);
    setRemainingTime(newDuration);
    if (isOwner) {
      webSocket?.send(JSON.stringify({
        type: "UPDATE_TIMER_DURATION",
        payload: { timerId, duration: newDuration },
      }));  
    }
  };

  const handleRename = (newName: string) => {
    console.log("handleRename", newName);
    webSocket?.send(JSON.stringify({
      type: "RENAME_TIMER",
      payload: {
        timerId: timerId,
        name: newName,
      },
    }));
  };

  return {
    remainingTime,
    isRunning,
    editableDuration,
    handleStart,
    handleReset,
    handleDurationChange,
    handleRename,
  };
} 