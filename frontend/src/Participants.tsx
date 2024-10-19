import React from "react";
import User from "./User";
import { UserInterface } from "../../src/Classes/userInterface";

interface ParticipantsProps {
  thisUser: UserInterface;
  users: UserInterface[];
  owner: UserInterface;
}

const Participants: React.FC<ParticipantsProps> = ({ thisUser, users, owner }) => {
  return (
    <div className="participants-container">
      <ul className="user-list">
        {users.map((user) => (
          <User key={user.id} id={user.id} name={user.name} 
            isThisUser={user.id === thisUser?.id}
            isOwner={user.id === owner?.id}
          />
        ))}
      </ul>
    </div>
  );
};

export default Participants;
