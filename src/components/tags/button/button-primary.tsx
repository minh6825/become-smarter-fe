import React from "react";

type Props = {
  loading?: boolean;
  children: React.ReactNode;
  type: "button" | "submit";
  onClick?: () => void
  className?: string
};

const ButtonPrimary = ({ loading, children, type, onClick, className }: Props) => {
  return (
    <button
      type={type} onClick={onClick}
      className={`w-full px-4 py-2 text-white font-medium rounded ${
        loading ? "bg-gray-500" : "bg-primary-background border hover:opacity-90"
      } ${className}`}
      disabled={loading}
    >
      {children}
    </button>
  );
};

export default ButtonPrimary;
