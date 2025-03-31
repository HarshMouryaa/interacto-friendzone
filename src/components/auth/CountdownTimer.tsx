
import { useState, useEffect } from "react";

interface CountdownTimerProps {
  initialSeconds: number;
  onComplete: () => void;
}

export function CountdownTimer({ initialSeconds, onComplete }: CountdownTimerProps) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let intervalId: number;
    
    if (isActive && seconds > 0) {
      intervalId = window.setInterval(() => {
        setSeconds((prevSeconds) => {
          const newSeconds = prevSeconds - 1;
          if (newSeconds <= 0) {
            setIsActive(false);
            onComplete();
            return 0;
          }
          return newSeconds;
        });
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isActive, seconds, onComplete]);

  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="text-sm text-muted-foreground">
      {formatTime(seconds)}
    </div>
  );
}
