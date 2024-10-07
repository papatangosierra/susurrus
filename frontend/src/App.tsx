import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Timer from './Timer';
import Participants from './Participants';

const getTimerState = () => {
  // hardcoded dummy data
  const dummyData = {
    userId: '1',
    userName: 'Paul Starr',
    timerId: 'abc',
    timerName: 'Juppun Souji',
    duration: 60000,
    startTime: 0,
    isRunning: false,
    owner: '1',
    users: ['1', '2', '3'],
    pingQueue: [],
  };
  return dummyData;
};


// App component
const App: React.FC = () => {
  const [timerState, setTimerState] = useState(getTimerState());
  return (
    <div>
      <h1>{timerState.timerName}</h1>
      <Timer />
      <Participants />
    </div>
  );
}

// Render the App component to the DOM
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);
