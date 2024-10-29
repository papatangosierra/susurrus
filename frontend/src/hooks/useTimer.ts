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
    setEditableDuration(duration);
    if (startTime + duration > Date.now()) {
      setIsRunning(true);
      const elapsedTime = Date.now() - startTime;
      setRemainingTime(Math.max(0, duration - elapsedTime));
    } else {
      setIsRunning(false);
      setRemainingTime(duration);
    }
  }, [duration, startTime]);

  useEffect(() => {
    let intervalId: number | undefined;
    if (isRunning && remainingTime > 0) {
      intervalId = window.setInterval(() => {
        setRemainingTime((prevTime) => {
          const newTime = Math.max(0, prevTime - 100);
          if (newTime === 0) {
            setIsRunning(false);
            if (isOwner || audioEnabled) {
              try {
                audioService.play('timerEnd');
              } catch (error) {
                console.warn('Could not play timer end sound:', error);
              }
            }
          }
          return newTime;
        });
      }, 100);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, remainingTime, isOwner, audioEnabled]);

  useEffect(() => {
    if (!isRunning) {
      setEditableDuration(duration);
      setRemainingTime(duration);
    }
  }, [duration, isRunning]);

  const handleStart = () => {
    webSocket?.send(JSON.stringify({
      type: "START_TIMER",
      payload: { timerId, startTime: Date.now() },
    }));
    try {
      audioService.play('timerStart');
    } catch (error) {
      console.warn('Could not play timer start sound:', error);
    }
    setRemainingTime(editableDuration);
  };

  const handleReset = () => {
    webSocket?.send(JSON.stringify({
      type: "RESET_TIMER",
      payload: { timerId, duration: editableDuration },
    }));
  };

  const handleDurationChange = (newDuration: number) => {
    setEditableDuration(newDuration);
    setRemainingTime(newDuration);
    webSocket?.send(JSON.stringify({
      type: "UPDATE_TIMER_DURATION",
      payload: { timerId, duration: newDuration },
    }));
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