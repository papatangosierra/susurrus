import React, { useRef } from "react";

declare global {
  interface WakeLockSentinel {
    release(): Promise<void>;
    addEventListener(type: string, listener: EventListener): void;
    removeEventListener(type: string, listener: EventListener): void;
  }
}

interface HereButtonProps {
  disabled?: boolean;
}

const HereButton: React.FC<HereButtonProps> = ({
  disabled = false,
}) => {
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);
  
  const handleClick = () => {
    if (!disabled) {
      requestWakeLock();
    }
  };

  const requestWakeLock = async () => {
    try {
      if ('wakeLock' in navigator) {
        wakeLockRef.current = await navigator.wakeLock?.request('screen');
        console.log('Wake Lock is active');
      }
    } catch (err) {
      console.log(`Wake Lock request failed: ${err}`);
    }
  };

  const releaseWakeLock = async () => {
    if (wakeLockRef.current) {
      try {
        await wakeLockRef.current.release();
        wakeLockRef.current = null;
        console.log('Wake Lock released');
      } catch (err) {
        console.log(`Wake Lock release failed: ${err}`);
      }
    }
  };

  return (
    <div className="start-button-container">
      <button className="here-button" onClick={handleClick} disabled={disabled}>
      I'm Here
    </button>
    </div>
  );
};

export default HereButton;
