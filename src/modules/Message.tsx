import * as React from "react";
import succsessImage from "../assets/icons/success-image.svg";

interface MessageProps {
  children: React.ReactNode;
}
export const Message: React.FC<MessageProps> = ({ children }) => {
  const successNotice = "New user successfully registered";

  return (
    <div className="fixed p-2 rounded-lg bottom-4 right-6 bg-yellow message">
      {children}
      {children === successNotice && (
        <img src={succsessImage} alt="success" className="w-40 h-40 m-auto" />
      )}
    </div>
  );
};
