import React from "react";

interface User {
  id: string;
  name: string;
}

const User: React.FC<User> = ({ id, name }) => {
  return <li className="user-container">{name}</li>;
};

export default User;
