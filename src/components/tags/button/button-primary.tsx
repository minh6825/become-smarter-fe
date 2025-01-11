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
      disabled={loading}
      className={`px-4 py-2 font-medium rounded-lg shadow-md transition-all duration-150 ease-in-out ${
        loading
          ? "bg-gray-400 text-gray-800 cursor-not-allowed"
          : "bg-primary text-primary-foreground hover:opacity-90"
      } ${className}`}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default ButtonPrimary;
