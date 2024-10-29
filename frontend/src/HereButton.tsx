import React, { useRef } from "react";
import { AudioService } from './services/AudioService';

declare global {
  interface WakeLockSentinel {
    release(): Promise<void>;
    addEventListener(type: string, listener: EventListener): void;
    removeEventListener(type: string, listener: EventListener): void;
  }
}

interface HereButtonProps {
  disabled?: boolean;
  onHereClick?: () => void;
}

const HereButton: React.FC<HereButtonProps> = ({
  disabled = false,
  onHereClick
}) => {
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);
  const audioService = useRef(AudioService.getInstance());
  
  const handleClick = async () => {
    if (!disabled) {
      await requestWakeLock();
      // Preload sounds when user clicks "I'm Here"
      audioService.current.preloadSounds();
      onHereClick?.();
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
