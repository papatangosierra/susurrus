import React from "react";
import User from "./User";
import { UserInterface } from "../../src/Classes/userInterface";

interface ParticipantsProps {
  thisUser: UserInterface | null;
  users: UserInterface[];
}

const Participants: React.FC<ParticipantsProps> = ({ thisUser, users }) => {
  return (
    <div className="participants-container">
      <h2>Participants</h2>
      <ul className="user-list">
        {users.map((user) => (
          <User key={user.id} id={user.id} name={user.name} 
            isThisUser={user.id === thisUser?.id}
          />
        ))}
      </ul>
    </div>
  );
};

export default Participants;
