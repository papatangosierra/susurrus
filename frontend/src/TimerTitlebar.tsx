import React, { useState, useEffect } from "react";

interface TimerTitlebarProps {
  name: string;
  onRename: (newName: string) => void;
}

const TimerTitlebar: React.FC<TimerTitlebarProps> = ({
  name,
  onRename,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);

  useEffect(() => {
    setEditedName(name);
  }, [name]);

  const handleRename = () => {
    // console.log("TimerTitlebar handleRename called", { editedName });
    if (editedName.trim() !== "") {
      onRename(editedName.trim());
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <div className="timer-titlebar">
        <input
          maxLength={10}
          type="text"
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
          onBlur={handleRename}
          onKeyPress={(e) => {
            if (e.key === "Enter") handleRename();
          }}
          autoFocus
        />
      </div>
    );
  }

  return (
    <div className="timer-titlebar">
      <h1 onClick={() => {
        // console.log("Title clicked");
        setIsEditing(true);
      }}>
        {name}
      </h1>
    </div>
  );
};

export default TimerTitlebar;