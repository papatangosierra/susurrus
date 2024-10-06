// Imports
import React from 'react';
import ReactDOM from 'react-dom/client';

// App component
const App: React.FC = () => {
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}

// Render the App component to the DOM
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);
