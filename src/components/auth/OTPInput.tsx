"use client";

import { useRef, useState, type KeyboardEvent, type ClipboardEvent } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type OTPInputProps = {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

export function OTPInput({
  length = 6,
  value,
  onChange,
  disabled,
}: OTPInputProps) {
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const [focusedIndex, setFocusedIndex] = useState(0);

  const digits = value.padEnd(length, " ").slice(0, length).split("");

  const updateAt = (index: number, char: string) => {
    const next = digits.map((d, i) => (i === index ? char : d.trim())).join("");
    onChange(next.replace(/\s/g, "").slice(0, length));
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      if (digits[index]?.trim()) {
        updateAt(index, "");
      } else if (index > 0) {
        inputs.current[index - 1]?.focus();
        updateAt(index - 1, "");
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    onChange(pasted);
    const focusIdx = Math.min(pasted.length, length - 1);
    inputs.current[focusIdx]?.focus();
  };

  return (
    <div className="flex justify-center gap-2" role="group" aria-label="One-time password">
      {Array.from({ length }).map((_, index) => (
        <Input
          key={index}
          ref={(el) => {
            inputs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          autoComplete={index === 0 ? "one-time-code" : "off"}
          maxLength={1}
          disabled={disabled}
          value={digits[index]?.trim() ?? ""}
          aria-label={`Digit ${index + 1} of ${length}`}
          className={cn(
            "h-12 w-11 text-center text-lg font-semibold",
            focusedIndex === index && "ring-2 ring-ring",
          )}
          onFocus={() => setFocusedIndex(index)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          onChange={(e) => {
            const char = e.target.value.replace(/\D/g, "").slice(-1);
            updateAt(index, char);
            if (char && index < length - 1) inputs.current[index + 1]?.focus();
          }}
        />
      ))}
    </div>
  );
}
