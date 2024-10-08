import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Timer from "./Timer";
import Participants from "./Participants";

const getTimerState = () => {
  // hardcoded dummy data
  const dummyData = {
    userId: "1",
    userName: "Paul",
    timerId: "abc",
    timerName: "Juppun Souji",
    remainingTime: 10000,
    startTime: 0,
    isRunning: false,
    owner: "1",
    users: [
      { id: "1", name: "Paul" },
      { id: "2", name: "Whit" },
      { id: "3", name: "Christine" },
      { id: "4", name: "Angela" },
      { id: "5", name: "Molly" },
    ],
    pingQueue: [],
  };
  return dummyData;
};

// App component
const App: React.FC = () => {
  const [timerState, setTimerState] = useState(getTimerState());
  return (
    <div className="app-container">
      <h1>{timerState.timerName}</h1>
      <Timer
        initialTime={timerState.remainingTime}
        isRunning={timerState.isRunning}
      />
      <Participants users={timerState.users} />
    </div>
  );
};

// Render the App component to the DOM
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(<App />);
