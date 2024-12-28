import { div } from "motion/react-client";
import React from "react";

type InputPrimaryProps = {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string; // Optional custom styles
  disabled?: boolean;
  name?: string;
  id?: string;
  required?: boolean;
  label?: string
};

const InputPrimary: React.FC<InputPrimaryProps> = ({
  type = "text",
  placeholder = "",
  value,
  onChange,
  className = "",
  disabled = false,
  name,
  id,
  required,label
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm mb-1 font-medium ">
        {label}
      </label>
      <input
        id={id}
        required={required}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        name={name}
        className={`px-4 py-2 border border-gray-300 bg-primary-background w-full text-primary rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      />
    </div>
  );
};

export default InputPrimary;
