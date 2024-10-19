import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import Timer from "./Timer";
import Participants from "./Participants";
import { UserInterface } from "../../src/Classes/userInterface";
import { TimerInterface } from "../../src/Classes/timerInterface";
import { ClientStateInterface } from "../../src/Classes/clientStateInterface";

// App component
const App: React.FC= () => {
  const [thisUser, setThisUser] = useState<UserInterface | null>(null);
  const [timer, setTimer] = useState<TimerInterface | null>(null);

  useEffect(() => { 
    let current
    // if the user specified a timer in the URL, connect to it,
    // otherwise, connect to the default URL (thus creating a new timer)
    const urlPath = window.location.pathname;
    const timerId = urlPath.split('/')[2];
    console.log('timerId: ', timerId);
    const wsUrl = timerId 
      ? `ws://localhost:3000/ws?timerId=${timerId}`
      : 'ws://localhost:3000/ws';
    
    const client = new WebSocket(wsUrl);
    client.onopen = () => {
      console.log('WebSocket Client Connected');
      // client.send("here comes a new challenger");
    };

    client.onmessage = (message) => {
      const data = JSON.parse(message.data as string);
      // set timer URL in the browser
      if (data.timer) {
        window.history.pushState(null, '', `/timers/${data.timer.id}`);
      }
      console.log("data: ", data);
      // Set the timer if we got new data
      setTimer(data.timer ? data.timer : timer);
      // Set the user if we got new data
      setThisUser(data.user ? data.user : thisUser);
    };

    return () => {
      client.close();
    };
  }, []);

  if (!timer) {
    return <div>Loading...</div>;
  }
  return (
    <div className="app-container">
      <h1>{timer?.name}</h1>
      <Timer
        duration={timer?.duration ?? 0}
        startTime={timer?.startTime ?? 0}
      />
      <Participants thisUser={thisUser} users={timer?.users ?? [] } />
    </div>
  );
};

// Render the App component to the DOM
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(<App />);
