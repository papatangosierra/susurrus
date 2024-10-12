import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Timer from "./Timer";
import Participants from "./Participants";

const getClientState = () => {
  // hardcoded dummy data
  const state = {
    timer: {
      id: "abc",
      name: "Juppun Souji",
      duration: 10000,
      startTime: 0,
      owner: {
        id: "1",
        name: "Paul",
      },
      users: [
        { id: "1", name: "Paul" },
        { id: "2", name: "Whit" },
        { id: "3", name: "Christine" },
        { id: "4", name: "Angela" },
        { id: "5", name: "Molly" },
      ],
      pingQueue: [],
      deletedAt: 0,
    },
    user: {
      id: "1",
      name: "Paul",
    }
  }
  
  return state;
};

// App component
const App: React.FC = () => {
  const [clientState, setClientState] = useState(getClientState());
  return (
    <div className="app-container">
      <h1>{clientState.timer.name}</h1>
      <Timer
        duration={clientState.timer.duration}
        startTime={clientState.timer.startTime}
      />
      <Participants users={clientState.timer.users} />
    </div>
  );
};

// Render the App component to the DOM
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(<App />);
