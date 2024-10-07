import React from 'react';
import ReactDOM from 'react-dom/client';

const Participants: React.FC = ( { users } ) => {
  return (
    <div>
      <h1>Participants</h1>
      <ul>
        {users.map((user) => (
          <li key={user}>{user}</li>
        ))}
      </ul>
    </div>
  );
};

export default Participants;