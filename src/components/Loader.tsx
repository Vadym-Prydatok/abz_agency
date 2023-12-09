import * as React from "react";

export const Loader = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="w-12 h-12 border-t-2 border-b-2 rounded-full border-blue animate-spin"></div>
    </div>
  );
};