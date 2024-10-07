import React from 'react';
import ReactDOM from 'react-dom/client';

interface ParticipantsProps {
  users: string[];
}

const Participants: React.FC<ParticipantsProps> = ( { users } ) => {
  return (
    <div className="participants-container">
      <h2>Participants</h2>
      <ul>
        {users.map((user) => (
          <li key={user}>{user}</li>
        ))}
      </ul>
    </div>
  );
};

export default Participants;