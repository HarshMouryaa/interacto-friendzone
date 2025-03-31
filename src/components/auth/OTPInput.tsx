
import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface OTPInputProps {
  length?: number;
  onComplete: (otp: string) => void;
  className?: string;
}

export function OTPInput({
  length = 4,
  onComplete,
  className,
}: OTPInputProps) {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const focusNext = (index: number) => {
    if (index < length - 1 && inputs.current[index + 1]) {
      inputs.current[index + 1]?.focus();
    }
  };

  const focusPrev = (index: number) => {
    if (index > 0 && inputs.current[index - 1]) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value !== "") {
        focusNext(index);
      }

      // Check if OTP is complete
      if (newOtp.every(digit => digit !== "") && !newOtp.includes("")) {
        onComplete(newOtp.join(""));
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (otp[index] === "") {
        focusPrev(index);
      } else {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    } else if (e.key === "ArrowLeft") {
      focusPrev(index);
    } else if (e.key === "ArrowRight") {
      focusNext(index);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();
    
    if (/^\d+$/.test(pastedData) && pastedData.length <= length) {
      const newOtp = [...otp];
      for (let i = 0; i < pastedData.length; i++) {
        if (i < length) {
          newOtp[i] = pastedData[i];
        }
      }
      setOtp(newOtp);
      
      // Focus last filled input or the next empty one
      const lastFilledIndex = Math.min(pastedData.length, length) - 1;
      if (inputs.current[lastFilledIndex]) {
        inputs.current[lastFilledIndex]?.focus();
      }
      
      // Check if OTP is complete
      if (newOtp.every(digit => digit !== "")) {
        onComplete(newOtp.join(""));
      }
    }
  };

  return (
    <div className={cn("flex justify-center gap-2", className)}>
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          type="text"
          inputMode="numeric"
          ref={(el) => (inputs.current[index] = el)}
          value={otp[index]}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className="h-12 w-12 rounded-md border border-input bg-background text-center text-xl font-medium shadow-sm focus:border-primary focus:ring-1 focus:ring-primary focus-visible:outline-none"
          maxLength={1}
          autoComplete="one-time-code"
        />
      ))}
    </div>
  );
}
