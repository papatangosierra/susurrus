import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import Timer from "./Timer";
import Participants from "./Participants";


// App component
const App: React.FC= () => {
  const [clientState, setClientState] = useState(null);

  useEffect(() => {
    const client = new WebSocket('ws://localhost:3000/ws');

    client.onopen = () => {
      console.log('WebSocket Client Connected');
      client.send("here comes a new challenger");
    };


    client.onmessage = (message) => {
      const newState = JSON.parse(message.data as string);
      setClientState(newState);
    };

    return () => {
      client.close();
    };
  }, []);

  if (!clientState) {
    return <div>Loading...</div>;
  }
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
