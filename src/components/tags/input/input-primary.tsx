import React from "react";

type InputPrimaryProps = {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  disabled?: boolean;
  name?: string;
  id?: string;
  required?: boolean;
  label?: string;
  classNameBox?: string;
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
  required,
  label,
  classNameBox = "",
}) => {
  return (
    <div className={`space-y-2 ${classNameBox}`}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-primary"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        name={name}
        required={required}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full px-4 py-2 border rounded-lg bg-primary-background text-primary focus:ring focus:ring-primary focus:outline-none ${className}`}
      />
    </div>
  );
};

export default InputPrimary;
