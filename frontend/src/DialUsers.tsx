import React, { useState, useEffect } from "react";
import User from "./User";
import { UserInterface } from "../../src/Classes/userInterface";

interface DialUsersProps {
  value: number;
  users: UserInterface[];
  thisUser: UserInterface | null;
  owner: UserInterface;
  pingingUserId?: string;
}

const DialUsers: React.FC<DialUsersProps> = ({ value, users, thisUser, owner, pingingUserId }) => {
  const [pingingUser, setPingingUser] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (pingingUserId) {
      setPingingUser(pingingUserId);
      const timer = setTimeout(() => {
        setPingingUser(undefined);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [pingingUserId]);

  // Calculate the time-based rotation (0 to 360 degrees)
  const minutesRemaining = value / 60000;
  const fractionRemaining = minutesRemaining / 60;
  const rotation = fractionRemaining * 360;
  
  return (
    <div 
      id="dial-userlist"
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <ul style={{
        // transform: `translateY(-50%) rotate(-${rotation}deg)`,
      }}>
        {users.map((user) => (
          <User
            key={user.id}
            id={user.id}
            value={value}
            name={user.name}
            isThisUser={user.id === thisUser?.id}
            isOwner={user.id === owner.id}
            rotation={0}
            isPinging={user.id === pingingUser}
          />
        ))}
      </ul>
    </div>
  );
};

export default DialUsers;
