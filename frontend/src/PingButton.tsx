import React, { useRef } from "react";
import { AudioService } from './services/AudioService';
import { useTimer } from './hooks/useTimer';

declare global {
  interface WakeLockSentinel {
    release(): Promise<void>;
    addEventListener(type: string, listener: EventListener): void;
    removeEventListener(type: string, listener: EventListener): void;
  }
}

interface PingButtonProps {
  disabled?: boolean;
  onPingClick?: () => void;
}

const PingButton: React.FC<PingButtonProps> = ({
  disabled = false,
  onPingClick
}) => {
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);
  const audioService = useRef(AudioService.getInstance());
  
  const handleClick = async () => {
    if (!disabled) {
      await requestWakeLock();
      // Preload sounds when user clicks "I'm Here"
      audioService.current.preloadSounds();
      onPingClick?.();
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
    <button className="ping-button" onClick={handleClick} disabled={disabled}>
      Ping
    </button>
  );
};

export default PingButton;
