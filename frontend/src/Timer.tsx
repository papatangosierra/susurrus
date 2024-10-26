import React, { useEffect, useState, useContext } from "react";
import StartButton from "./StartButton";
import ResetButton from "./ResetButton";
import Dial from "./Dial";
import TimerTitlebar from "./TimerTitlebar";
import WebSocketContext from "./WebSocketContext";
import { UserInterface } from "../../src/Classes/userInterface";

interface TimerProps {
  name: string;
  duration: number;
  startTime: number;
  timerId: string;
  owner: UserInterface;
  currentUser: UserInterface;
}

const Timer: React.FC<TimerProps> = ({
  name,
  duration,
  startTime,
  timerId,
  owner,
  currentUser,
}) => {
  const [remainingTime, setRemainingTime] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const [editableDuration, setEditableDuration] = useState(duration);
  const webSocket = useContext(WebSocketContext);

  useEffect(() => {
    console.log("Timer props updated: ", { duration, startTime });
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
          }
          return newTime;
        });
      }, 100);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, remainingTime]);

  const handleStart = () => {
    if (webSocket) {
      webSocket.send(
        JSON.stringify({
          type: "START_TIMER",
          payload: {
            timerId: timerId,
            startTime: Date.now(),
          },
        }),
      );
    }
    setRemainingTime(editableDuration); // Set remaining time to editable duration when starting
  };

  const handleReset = () => {
    if (webSocket) {
      webSocket.send(
        JSON.stringify({
          type: "RESET_TIMER",
          payload: {
            timerId: timerId,
            duration: editableDuration,
          },
        }),
      );
    }
  };

  const handleDurationChange = (newDuration: number) => {
    setEditableDuration(newDuration);
    if (webSocket) {
      webSocket.send(
        JSON.stringify({
          type: "UPDATE_TIMER_DURATION",
          payload: {
            timerId: timerId,
            duration: newDuration,
          },
        }),
      );
    }
  };

  const incrementMinutes = () => {
    if (!isRunning) {
      handleDurationChange(editableDuration + 60000);
    }
  };

  const decrementMinutes = () => {
    if (!isRunning && editableDuration >= 60000) {
      handleDurationChange(editableDuration - 60000);
    }
  };

  const incrementSeconds = () => {
    if (!isRunning) {
      handleDurationChange(editableDuration + 1000);
    }
  };

  const decrementSeconds = () => {
    if (!isRunning && editableDuration >= 1000) {
      handleDurationChange(editableDuration - 1000);
    }
  };

  const isOwner = currentUser && owner && currentUser.id === owner.id;


  const minutes = Math.floor(remainingTime / 60000);
  const seconds = Math.floor((remainingTime % 60000) / 1000);
  const tenths = Math.floor((remainingTime % 1000) / 100);

  const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  const paddedTenths = `0${tenths}`;

  const handleRename = (newName: string) => {
    if (webSocket) {
      webSocket.send(
        JSON.stringify({
          type: "RENAME_TIMER",
          payload: {
            timerId: timerId,
            name: newName,
          },
        })
      );
    }
  };

  return (
    <div className="app-container">
      <div id="app-firsthalf">
        <TimerTitlebar name={name} isOwner={isOwner} onRename={handleRename} />
        <div className="remaining-time-display">
          <div className="countdown">
            <div className="time-control">
              {isOwner && !isRunning && (
                <button onClick={incrementMinutes}>▲</button>
              )}
              <div id="countdown-minutes">{minutes}</div>
              {isOwner && !isRunning && (
                <button onClick={decrementMinutes}>▼</button>
              )}
            </div>
            <div className="time-control">
              {isOwner && !isRunning && (
                <button onClick={incrementSeconds}>▲</button>
              )}
              <div id="countdown-seconds">{paddedSeconds}</div>
              {isOwner && !isRunning && (
                <button onClick={decrementSeconds}>▼</button>
              )}
            </div>
            <div id="countdown-tenths">{paddedTenths}</div>
          </div>
        </div>
      </div>

      <div id="app-secondhalf">
        <Dial value={remainingTime} isOwner={isOwner} />
        {isOwner && <StartButton onStart={handleStart} disabled={isRunning} />}
        {isOwner && <ResetButton onReset={handleReset} disabled={!isRunning} />}
      </div>
    </div>
  );
};

export default Timer;
