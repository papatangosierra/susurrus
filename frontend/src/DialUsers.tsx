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
  return (
    <ul className="dial-userlist">
      {users.map((user) => (
        <User
          key={user.id}
          id={user.id}
          value={value}
          name={user.name}
          isThisUser={user.id === thisUser?.id}
          isOwner={user.id === owner.id}
        />
      ))}
    </>
  );
};

export default DialUsers;