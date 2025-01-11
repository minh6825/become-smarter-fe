"use client";
import React, { useState, useEffect } from "react";

type DebouncedInputProps = {
  value: string;
  onChange: (value: string) => void;
  debounceTime?: number;
  placeholder?: string;
  className?: string;
  label?: string;
};

const DebouncedInput: React.FC<DebouncedInputProps> = ({
  value,
  onChange,
  debounceTime = 300,
  placeholder,
  className = "",
  label,
}) => {
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      onChange(internalValue);
    }, debounceTime);

    return () => {
      clearTimeout(handler);
    };
  }, [internalValue, debounceTime, onChange]);

  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium text-primary">{label}</label>}
      <input
        type="text"
        value={internalValue}
        onChange={(e) => setInternalValue(e.target.value)}
        placeholder={placeholder}
        className={`px-4 py-2 border rounded-lg bg-primary-background text-primary focus:ring focus:ring-primary focus:outline-none ${className}`}
      />
    </div>
  );
};

export default DebouncedInput;
