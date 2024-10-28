import React, { useState, useEffect, useRef } from "react";

interface UserProps {
  id: string;
  value: number;
  name: string;
  isThisUser: boolean;
  isOwner: boolean;
}

const User: React.FC<UserProps> = ({ id, value, name, isThisUser, isOwner }) => {
  return (
    <li 
      className={`user-container ${isThisUser ? "this-user" : ""} ${isOwner ? "owner" : ""}`}
    >{name}
    </li>
  );
};

export default User;
