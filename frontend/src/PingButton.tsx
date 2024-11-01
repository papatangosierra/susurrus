import React, { useRef, useContext } from "react";
import { AudioService } from './services/AudioService';
import WebSocketContext from './WebSocketContext';
import { UserInterface } from "../../src/Classes/userInterface";

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
  user?: UserInterface;
}

const PingButton: React.FC<PingButtonProps> = ({
  disabled = false,
  onPingClick,
  user
}) => {
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);
  const audioService = useRef(AudioService.getInstance());
  const webSocket = useContext(WebSocketContext);
  
  const handleClick = async () => {
    if (!disabled) {
      await requestWakeLock();
      audioService.current.preloadSounds();
      
      if (webSocket && user) {
        webSocket.send(JSON.stringify({ 
          type: 'PING',
          payload: { user: user },
        }));
        console.log('Sent PING message for user:', user);
      }

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
