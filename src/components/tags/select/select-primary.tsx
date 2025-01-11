"use client";
import React from "react";

interface SelectPrimaryProps {
  label: string;
  name: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}

const SelectPrimary: React.FC<SelectPrimaryProps> = ({
  label,
  name,
  value,
  options,
  onChange,
  className = "",
}) => {
  return (
    <div className={`space-y-2`}>
      {label && (
        <label
          className="block text-sm font-medium text-primary"
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-2 border rounded-lg h-[42px] bg-primary-background text-primary focus:ring focus:ring-primary focus:outline-none ${className}`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectPrimary;
