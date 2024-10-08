import React from "react";
import User from "./User";
interface ParticipantsProps {
  users: string[];
}

const Participants: React.FC<ParticipantsProps> = ({ users }) => {
  return (
    <div className="participants-container">
      <h2>Participants</h2>
      <ul className="user-list">
        {users.map((user) => (
          <User key={user.id} id={user.id} name={user.name} />
        ))}
      </ul>
    </div>
  );
};

export default Participants;
