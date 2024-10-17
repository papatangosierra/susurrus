import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import Timer from "./Timer";
import Participants from "./Participants";
import { UserInterface } from "../../src/Classes/userInterface";
import { TimerInterface } from "../../src/Classes/timerInterface";

// App component
const App: React.FC= () => {
  const [timer, setTimer] = useState<TimerInterface | null>(null);
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [thisUser, setThisUser] = useState<UserInterface | null>(null);

  useEffect(() => {
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
      if (data.type === 'INITIAL_STATE') {
        setTimer(data.payload.timer);
        setUsers(data.payload.timer.users);
        setThisUser(data.payload.user);

        // update the URL with the timerId
        if (data.timerId) {
          history.pushState(null, '', `/timers/${data.timerId}`);
        }
      }

      if (data.type === 'USER_JOINED_TIMER') {
        setUsers(data.payload);
      }

      if (data.type === 'OTHER_USER_JOINED_TIMER') {
        setUsers([...users, data.payload]);
      }

      if (data.type === 'USER_LEFT_TIMER') {
        setUsers(users.filter(user => user.id !== data.payload.id));
      }
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
