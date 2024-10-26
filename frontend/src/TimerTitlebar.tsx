import React, { useState, useEffect } from "react";

interface TimerTitlebarProps {
  name: string;
  isOwner: boolean;
  onRename: (newName: string) => void;
}

export default function TimerTitlebar({ name, isOwner, onRename }: TimerTitlebarProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);

  useEffect(() => {
    setEditedName(name);
  }, [name]);

  const handleRename = () => {
    if (editedName.trim() !== "") {
      onRename(editedName.trim());
      setIsEditing(false);
    }
  };

  if (isEditing && isOwner) {
    return (
      <div className="timer-titlebar">
        <input
          maxLength={10}
          type="text"
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
          onBlur={handleRename}
          onKeyPress={(e) => e.key === "Enter" && handleRename()}
          autoFocus
        />
      </div>
    );
  }

  return (
    <div className="timer-titlebar">
      <h1 onClick={() => isOwner && setIsEditing(true)}>{name}</h1>
    </div>
  );
}
