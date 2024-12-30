import React from "react";

type Props = {
  loading?: boolean;
  children: React.ReactNode;
  type: "button" | "submit";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
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
      className={`w-full px-4 py-2 transition-all duration-150 border shadow-md ease-in-out font-bold rounded ${
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
