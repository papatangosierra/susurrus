import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import Timer from "./Timer";
import Participants from "./Participants";
import { UserInterface } from "../../src/Classes/userInterface";
import { TimerInterface } from "../../src/Classes/timerInterface";
import WebSocketContext from "./WebSocketContext";

// App component
const App: React.FC = () => {
  const [thisUser, setThisUser] = useState<UserInterface | null>(null);
  const [timer, setTimer] = useState<TimerInterface | null>(null);
  const [webSocket, setWebSocket] = useState<WebSocket | null>(null);

  useEffect(() => { 
    // if the user specified a timer in the URL, connect to it,
    // otherwise, connect to the default URL (thus creating a new timer)
    const urlPath = window.location.pathname;
    const timerId = urlPath.split('/')[2];
    console.log('timerId: ', timerId);
    const wsUrl = timerId 
      ? `/ws?timerId=${timerId}`
      : '/ws';
    
    const client = new WebSocket(wsUrl);
    setWebSocket(client);  // Store the WebSocket in state

    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };

    client.onmessage = (message) => {
      const data = JSON.parse(message.data as string);
      console.log("Received data: ", data);

      // set timer URL in the browser
      if (data.timer) {
        console.log("Updating timer state: ", data.timer);
        window.history.pushState(null, '', `/timers/${data.timer.id}`);
        setTimer(data.timer);
      }      
      // Update user state only if new user data is received
      if (data.user) {
        setThisUser(data.user);
      }
    };

    return () => {
      client.close();
    };
  }, []);

  if (!timer) {
    return (<div className="app-container"><h1>Loading...</h1></div>);
  }
  return (
    <WebSocketContext.Provider value={webSocket}>
        <Timer
          name={timer.name}
          duration={timer.duration}
          startTime={timer.startTime}
          timerId={timer.id}
          owner={timer.owner}
          currentUser={thisUser}
        />
        <Participants thisUser={thisUser ?? null} users={timer?.users ?? []} owner={timer.owner}/>
    </WebSocketContext.Provider>
  );
};

// Render the App component to the DOM
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(<App />);
