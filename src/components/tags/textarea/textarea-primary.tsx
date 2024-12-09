import React from "react";

type TextareaPrimaryProps = {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number; // Number of rows
  className?: string; // Optional custom styles
  disabled?: boolean;
  name?: string;
  id?: string;
  required?: boolean;
  label?: string
};

const TextareaPrimary: React.FC<TextareaPrimaryProps> = ({
  value,
  onChange,
  placeholder = "",
  rows = 4,
  className = "",
  disabled = false,
  name,
  id,
  required, label
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium ">
        {label}
      </label>
      <textarea
        required={required}
        value={value}
        id={id}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        name={name}
        className={`px-4 py-2 border border-gray-300 w-full text-primary bg-primary-foreground rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${className}`}
      />
    </div>
  );
};

export default TextareaPrimary;
