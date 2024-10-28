import React from "react";
import User from "./User";
import { UserInterface } from "./Classes/userInterface";

interface DialUsersProps {
  value: number;
  users: UserInterface[];
  thisUser: UserInterface | null;
  owner: UserInterface;
}

const DialUsers: React.FC<DialUsersProps> = ({ value, users, thisUser, owner }) => {
  // Calculate the time-based rotation (0 to 360 degrees)
  const minutesRemaining = value / 60000;
  const fractionRemaining = minutesRemaining / 60;
  const timeRotation = fractionRemaining * 360;
  
  // Fixed angle for each user (adjust this value to control spacing)
  const anglePerUser = 18; // degrees
  
  return (
    <ul id="dial-userlist">
      {users.map((user, index) => {
        // Position each user with fixed spacing, offset by time rotation
        const rotation = timeRotation + (index * anglePerUser);
        return (
          <User
            key={user.id}
            id={user.id}
            value={value}
            name={user.name}
            isThisUser={user.id === thisUser?.id}
            isOwner={user.id === owner.id}
            rotation={rotation}
          />
        );
      })}
    </ul>
  );
};

export default DialUsers;
