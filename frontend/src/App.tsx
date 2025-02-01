import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import Timer from "./Timer";
import { UserInterface } from "../../src/Classes/userInterface";
import { TimerInterface } from "../../src/Classes/timerInterface";
import WebSocketContext from "./WebSocketContext";
import { AudioService } from "./services/AudioService";

// Utility functions
function getCSSVariable(variable: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(variable);
}

function setCSSVariable(variable: string, value: string) {
  document.documentElement.style.setProperty(variable, value);
}

// set up listener for "j" key to decrement the value of the --hue variable
document.addEventListener('keydown', (event) => {
  if (event.key === 'j') {
    setCSSVariable('--hue', (parseInt(getCSSVariable('--hue')) - 1).toString());
  }
});

// set up listener for "k" key to increment the value of the --hue variable
document.addEventListener('keydown', (event) => {
  if (event.key === 'k') {
    setCSSVariable('--hue', (parseInt(getCSSVariable('--hue')) + 1).toString());
  }
});

// App component
const App: React.FC = () => {
  const [thisUser, setThisUser] = useState<UserInterface | null>(null);
  const [timer, setTimer] = useState<TimerInterface | null>(null);
  const [webSocket, setWebSocket] = useState<WebSocket | null>(null);
  const [pingingUserId, setPingingUserId] = useState<string | undefined>(undefined);

  useEffect(() => { 
    const audioService = AudioService.getInstance();
    // if the user specified a timer in the URL, connect to it,
    // otherwise, connect to the default URL (thus creating a new timer)
    const urlPath = window.location.pathname;
    const timerId = urlPath.split('/')[2];
    console.log('timerId: ', timerId);
    const wsUrl = timerId 
      ? `/ws?timerId=${timerId}`
      : '/ws';
    
    let heartbeatInterval: number;
    
    const setupWebSocket = () => {
      const client = new WebSocket(wsUrl);
      setWebSocket(client);

      client.onopen = () => {
        console.log('WebSocket Client Connected');
        // Start heartbeat
        heartbeatInterval = window.setInterval(() => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: 'HEARTBEAT' }));
          }
        }, 30000);
      };

      client.onclose = () => {
        console.log('WebSocket Connection Closed');
        clearInterval(heartbeatInterval);
        // Attempt to reconnect after 5 seconds
        setTimeout(setupWebSocket, 5000);
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

        // handle a ping from another user
        if (data.ping) {
          console.log("[App] Received ping from:", data.ping.from.name, "with ID:", data.ping.from.id);
          // generate a unique-ish pitch for the ping based on the user's ID
          const factor = 22;
          const numerator = Math.floor(parseFloat("0." + data.ping.from.id) * factor) + 1;
          console.log("[App] numerator:", numerator, "factor:", factor);
          const cents = (numerator / factor) * 1200; 
          audioService.play('ping', cents);
        
          setPingingUserId(data.ping.from.id);
        }
      };
    };

    setupWebSocket();

    return () => {
      clearInterval(heartbeatInterval);
    };
  }, []);

  useEffect(() => {
    if (pingingUserId) {
      const timer = setTimeout(() => {
        setPingingUserId(undefined);
      }, 500); // Match animation duration
      return () => clearTimeout(timer);
    }
  }, [pingingUserId]);

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
          currentUser={thisUser ?? null}
          users={timer?.users ?? []}
          pingingUserId={pingingUserId}
        />
    </WebSocketContext.Provider>
  );
};

// Render the App component to the DOM
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(<App />);
