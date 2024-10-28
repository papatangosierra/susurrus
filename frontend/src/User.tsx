import React from "react";

interface UserProps {
  id: string;
  value: number;
  name: string;
  isThisUser: boolean;
  isOwner: boolean;
  rotation: number;
}

const User: React.FC<UserProps> = ({ id, value, name, isThisUser, isOwner, rotation }) => {
  const style = {
    transform: `rotate(${rotation}deg)`,
  };

  return (
    <li 
      className={`user-container ${isThisUser ? "this-user" : ""} ${isOwner ? "owner" : ""}`}
      style={style}
    >
      <span className="user-name-line"><span className="user-name">{name}</span></span>
    </li>
  );
};

export default User;
