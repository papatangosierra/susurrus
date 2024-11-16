import React, { useEffect, useRef } from "react";

interface UserProps {
  id: string;
  value: number;
  name: string;
  isThisUser: boolean;
  isOwner: boolean;
  rotation: number;
  isPinging?: boolean;
}

const User: React.FC<UserProps> = ({ id, value, name, isThisUser, isOwner, rotation, isPinging }) => {
  const userNameRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = userNameRef.current;
    if (element && isPinging) {
      console.log("[User] Starting ping animation for:", name);
      element.classList.add('pinging');
      const timer = setTimeout(() => {
        element.classList.remove('pinging');
      }, 500);
      return () => {
        clearTimeout(timer);
        element.classList.remove('pinging');
      };
    }
  }, [isPinging, name]);

  const style = {
    transform: `rotate(${rotation}deg)`,
  };

  return (
    <li 
      className={`user-container ${isThisUser ? "this-user" : ""} ${isOwner && !isThisUser ? "owner" : ""}`}
      style={style}
    >
      <span className="user-name-line">
        <span ref={userNameRef} className="user-name">{name}</span>
      </span>
    </li>
  );
};

export default User;
