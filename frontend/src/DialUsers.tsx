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
    // console.log("[DialUsers] Received new pingingUserId:", pingingUserId);
    if (pingingUserId) {
      // console.log("[DialUsers] Setting pinging user to:", pingingUserId);
      setPingingUser(pingingUserId);
      const timer = setTimeout(() => {
        console.log("[DialUsers] Clearing pinging user");
        setPingingUser(undefined);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [pingingUserId]);

  // Calculate the time-based rotation (0 to 360 degrees)
  const minutesRemaining = value / 60000;
  const fractionRemaining = minutesRemaining / 60;
  const timeRotation = fractionRemaining * 360;
  
  const anglePerUser = 14; // degrees
  
  return (
    <ul id="dial-userlist">
      {users.map((user, index) => {
        const rotation = timeRotation + (index * anglePerUser);
        // console.log("[DialUsers] Current pingingUser state:", pingingUser);
        return (
          <User
            key={user.id}
            id={user.id}
            value={value}
            name={user.name}
            isThisUser={user.id === thisUser?.id}
            isOwner={user.id === owner.id}
            rotation={rotation}
            isPinging={user.id === pingingUser}
          />
        );
      })}
    </ul>
  );
};

export default DialUsers;
