import React from "react";

type Props = {
  loading?: boolean;
  children: React.ReactNode;
  type: "button" | "submit";
  onClick?: () => void;
  className?: string;
};

const ButtonPrimary = ({
  loading,
  children,
  type,
  onClick,
  className,
}: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full px-4 py-2 transition-all duration-150 hover:text-primary-text-button ease-in-out font-bold rounded ${
        loading
          ? "bg-primary"
          : "bg-primary-background border hover:opacity-90"
      } ${className}`}
      disabled={loading}
    >
      {children}
    </button>
  );
};

export default ButtonPrimary;
