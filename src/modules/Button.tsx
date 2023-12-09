import * as React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?:
    | (() => void)
    | ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void>);
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="py-1 px-[23px] rounded-[80px] bg-yellow hover:bg-yellow_hover transition-colors duration-300
    disabled:bg-gray disabled:text-white w-full"
    >
      {children}
    </button>
  );
};
