import React, { useState } from "react";
import TimeControls from "./TimeControls";
import { useTimer } from "./hooks/useTimer";
import StartButton from "./StartButton";
import ResetButton from "./ResetButton";
import HereButton from "./HereButton";
import Dial from "./Dial";
import TimerTitlebar from "./TimerTitlebar";
import { UserInterface } from "../../src/Classes/userInterface";

interface TimerProps {
  name: string;
  duration: number;
  startTime: number;
  timerId: string;
  owner: UserInterface;
  currentUser: UserInterface | null;
  users: UserInterface[];
}

const Timer: React.FC<TimerProps> = ({
  name,
  duration,
  startTime,
  timerId,
  owner,
  currentUser,
  users,
}) => {
  const [audioEnabled, setAudioEnabled] = useState(false);
  const isOwner = currentUser ? currentUser.id === owner.id : false;

  const {
    remainingTime,
    isRunning,
    editableDuration,
    handleStart,
    handleReset,
    handleDurationChange,
    handleRename,
  } = useTimer({ duration, startTime, timerId, isOwner, audioEnabled });

  const minutes = Math.floor(remainingTime / 60000);
  const seconds = Math.floor((remainingTime % 60000) / 1000);
  const tenths = Math.floor((remainingTime % 1000) / 100);

  const handleDurationUpdate = (newDuration: number) => {
    const validDuration = Math.max(0, newDuration);
    handleDurationChange(validDuration);
  };

  return (
    <div className="app-container">
      <div id="app-firsthalf">
        <TimerTitlebar 
          name={name} 
          isOwner={isOwner} 
          onRename={handleRename} 
        />
        <div className="remaining-time-display">
          <TimeControls
            minutes={minutes}
            seconds={seconds}
            tenths={tenths}
            isOwner={isOwner}
            isRunning={isRunning}
            onIncrementMinutes={() => handleDurationUpdate(editableDuration + 60000)}
            onDecrementMinutes={() => handleDurationUpdate(editableDuration - 60000)}
            onIncrementSeconds={() => handleDurationUpdate(editableDuration + 1000)}
            onDecrementSeconds={() => handleDurationUpdate(editableDuration - 1000)}
          />
        </div>
      </div>

      <div id="app-secondhalf">
        <Dial 
          value={remainingTime} 
          isOwner={isOwner} 
          thisUser={currentUser} 
          users={users} 
          owner={owner}
          onValueChange={isOwner ? handleDurationUpdate : undefined}
        />
        {isOwner && <StartButton onStart={handleStart} disabled={isRunning} />}
        {isOwner && <ResetButton onReset={handleReset} disabled={!isRunning} />}
        {!isOwner && <HereButton onHereClick={() => setAudioEnabled(true)}/>}
      </div>
    </div>
  );
};

export default Timer;
