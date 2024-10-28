import React from "react";
import { useState, useEffect } from "react";
import DialRemainingSlice from "./DialRemainingSlice";
import DialDigits from "./DialDigits";
import DialUsers from "./DialUsers";
import User from "./User";
import { UserInterface } from "../../src/Classes/userInterface";
interface DialProps {
  value: number;
  isOwner: boolean;
  thisUser: UserInterface | null;
  users: UserInterface[];
  owner: UserInterface;
}

const Dial: React.FC<DialProps> = ({ value, thisUser, users, owner }) => {

  return (
    <div className="dial">
      <svg className="dial-svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">

        <circle id="dial-background" cx="50" cy="50" r="45" fill="var(--color-control)" />

        <DialRemainingSlice value={value} />
        <DialDigits />
      </svg>
        <DialUsers id="dial-userlist" value={value} users={users} thisUser={thisUser} owner={owner} />
    </div>
  );
};

export default Dial;
